var queue = require('queue-async');
var notFalsePositiveGroupName = require('./not-false-positive-group-name');

function getNounCandidates(nounfinder, searchResult, done) {
  var q = queue();
  q.defer(nounfinder.getNounsFromText, searchResult.title);
  q.defer(nounfinder.getNounsFromText, searchResult.description);
  q.await(passBackNouns);

  function passBackNouns(error, titleNouns, descNouns) {
    if (error) {
      done(error);
    }
    else {
      var report = {
        fromTitle: titleNouns.filter(notFalsePositiveGroupName),
        fromDesc: descNouns.filter(notFalsePositiveGroupName)
      };
      done(error, report);
    }
  }
}

module.exports  = getNounCandidates;
