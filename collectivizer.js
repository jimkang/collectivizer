var defaultGoogle = require('google');
var canonicalizer = require('canonicalizer');
var exportMethods = require('export-methods');
var createNounfinder = require('nounfinder');
var async = require('async');
var _ = require('lodash');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var getCandidatesPrecedingOf = require('./get-candidates-preceding-of');
var getNounCandidates = require('./get-noun-candidates');
var notFalsePositiveURL = require('./not-false-positive-URL');
var rateCandidates = require('./rate-candidates.js');

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

  google.resultsPerPage = 10;

  var nounfinder = createNounfinder({
    wordnikAPIKey: wordnikAPIKey
  });

  function collectivize(noun, done) {
    var forms = canonicalizer.getSingularAndPluralForms(noun);
    var plural = forms[1];
    var singular = forms[0];
    var collectiveNoun;
    var resultIndex = 0;
    var results;
   
    google('"of ' + plural + '"', combResults);

    function combResults(error, next, searchResults) {
      if (error) {
        done(error);
      }
      else {
        results = searchResults;
        async.map(searchResults, parseResults, pickCandidatesFromResults);
      }
    }

    function doesNotContainNoun(word) {
      return word.indexOf(singular) === -1 && word.indexOf(plural) === -1;
    }

    // Filter out candidates that are contained in the subject. e.g Should 
    // not use "event" as a collective noun for "media event".
    function nounDoesNotContainCandidate(candidate) {
      return singular.indexOf(candidate) === -1;
    }

    function wordIsSingular(word) {
      var singularWord = canonicalizer.getSingularAndPluralForms(word)[0];
      return singularWord === word;
    }

    function parseResults(result, done) {
      var candidates = {};
      resultIndex += 1;
      console.log(result.link);

      if (!notFalsePositiveURL(result.link)) {
        console.log('Filtering result from:', result.link);
        done();
        return;
      }

      candidates.beforeOfs = getCandidatesPrecedingOf(result);

      getNounCandidates(nounfinder, result, sumUp);

      function sumUp(error, report) {
        if (error) {
          done(error);
        }
        else {
          candidates.nouns = report;
          filterNounFromcandidates(candidates);

          if (candidates.beforeOfs.fromTitle.length > 0 ||
            candidates.beforeOfs.fromDesc.length > 0 ||
            candidates.nouns.fromTitle.length > 0 ||
            candidates.nouns.fromDesc.length > 0) {
          }

          done(null, candidates);
        }
      }
    }

    function filterNounFromcandidates(candidates) {
      for (var key in candidates) {
        candidates[key].fromTitle = candidates[key].fromTitle
          .filter(doesNotContainNoun)
          .filter(nounDoesNotContainCandidate)
          .filter(wordIsSingular);
        candidates[key].fromDesc = candidates[key].fromDesc
          .filter(doesNotContainNoun)
          .filter(wordIsSingular);
      }
    }

    function pickCandidatesFromResults(error, results) {
      console.log(JSON.stringify(results, null, '  '));
      var scoresForCandidates = rateCandidates(results);
      var sortedCandidatesForScores = _.invert(scoresForCandidates);

      done(error, sortedCandidatesForScores);
    }
  }
  
  return exportMethods(collectivize);
}

module.exports = createCollectivizer;
