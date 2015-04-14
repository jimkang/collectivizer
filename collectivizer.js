var defaultGoogle = require('google');
var canonicalizer = require('canonicalizer');
var exportMethods = require('export-methods');
var createNounfinder = require('nounfinder');
var async = require('async');
var _ = require('lodash');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var getCandidatesPrecedingOf = require('./get-candidates-preceding-of');

function createCollectivizer(opts) {
  var google;

  if (opts) {
    google = opts.google;
  }

  if (!google) {
    google = defaultGoogle;
  }

  google.resultsPerPage = 10;

  // var nounfinder = createNounfinder();

  function collectivize(noun, done) {
    var forms = canonicalizer.getSingularAndPluralForms(noun);
    var plural = forms[1];
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
        async.until(
          collectiveNounIsSet, pickCollectiveNoun, passBackCollectiveNoun
        );
      }
    }

    function passBackCollectiveNoun(error) {
      debugger;
      if (error) {
        done(error);
      }
      else {
        done(error, collectiveNoun);
      }
    }

    function collectiveNounIsSet() {
      return collectiveNoun;
    }

    function pickCollectiveNoun(pickDone) {
      var result = results[resultIndex];
      var candidates = {};
      resultIndex += 1;
      // nounfinder.getNounsFromText(result.title, done);

      candidates.beforeOfs = getCandidatesPrecedingOf(result);
      
      if (candidates.beforeOfs.fromTitle.length > 0 ||
        candidates.beforeOfs.fromDesc.length > 0) {

        collectiveNoun = candidates;
      }

      callBackOnNextTick(pickDone);
    }
  }

  return exportMethods(collectivize);
}

module.exports = createCollectivizer;
