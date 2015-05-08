var defaultGoogle = require('google');
var canonicalizer = require('canonicalizer');
var exportMethods = require('export-methods');
var async = require('async');
var _ = require('lodash');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var categorizeByPrecedingOf = require('./categorize-by-preceding-of');
var getNounCandidates = require('./get-noun-candidates');
var notFalsePositiveURL = require('./not-false-positive-url');
var rateCandidates = require('./rate-candidates.js');
var createWordnok = require('wordnok').createWordnok;
var queue = require('queue-async');
var createCandidateWordFilters = require('./candidate-word-filters');
var searchResultIsNotFromADictionary = require('./search-result-is-not-from-a-dictionary');

function createCollectivizer(opts) {
  var google;
  var wordnikAPIKey;

  if (opts) {
    google = opts.google;
    wordnikAPIKey = opts.wordnikAPIKey;
  }

  if (!google) {
    google = defaultGoogle;
  }

  google.resultsPerPage = 20;

  var wordnok = createWordnok({
    apiKey: wordnikAPIKey,
    logger: {
      log: function noOp() {}
    }
  });

  function collectivize(noun, done) {
    var forms = canonicalizer.getSingularAndPluralForms(noun);
    var plural = forms[1];
    var singular = forms[0];
    var collectiveNoun;
    var resultIndex = 0;
    var results;

    filters = createCandidateWordFilters({
      singularFormOfRoot: singular,
      pluralFormOfRoot: plural
    });

    google('"of ' + plural + '"', combResults);

    function combResults(error, next, searchResults) {
      if (error) {
        done(error);
      }
      else {
        results = searchResults;
        async.map(searchResults, parseResults, scoreCandidates);
      }
    }

    function parseResults(result, done) {
      var candidates = {};
      resultIndex += 1;
      // console.log(result.link);

      if (!notFalsePositiveURL(result.link) ||
        !searchResultIsNotFromADictionary(result)) {

        // console.log('Filtering result from:', result.link);
        done();
        return;
      }

      var q = queue();

      var categorizedResult = categorizeByPrecedingOf(result);
      q.defer(
        getNounCandidates, wordnok, categorizedResult.wordsNotPrecedingOf
      );
      q.defer(getNounCandidates, wordnok, categorizedResult.wordsPrecedingOf);

      q.await(sumUp);

      function sumUp(error, reportNotPrecedingOf, reportPrecedingOf) {
        if (error) {
          done(error);
        }
        else {
          candidates.nouns = reportNotPrecedingOf;
          candidates.beforeOfNouns = reportPrecedingOf;
          applyFiltersToCandidates(candidates);
          done(null, candidates);
        }
      }
    }

    function applyFiltersToCandidates(candidates) {
      for (var key in candidates) {
        candidates[key].fromTitle = filters.applyAllFiltersToWords(
          candidates[key].fromTitle
        );
        candidates[key].fromDesc = filters.applyAllFiltersToWords(
          candidates[key].fromDesc
        );
      }
    }

    function scoreCandidates(error, results) {
      // console.log('Scoring:',JSON.stringify(results, null, '  '));
      rateCandidates(results, wordnok, pickCandidatesFromResults);
    }

    function pickCandidatesFromResults(error, scoresForCandidates) {
      var sortedCandidatesForScores = _.invert(scoresForCandidates);
      done(error, sortedCandidatesForScores);
    }
  }
  
  return exportMethods(collectivize);
}

module.exports = createCollectivizer;
