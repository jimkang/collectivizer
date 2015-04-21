var _ = require('lodash');

var titleValue = 5;
var beforeOfValue = 10;
var baseValue = 1;
var firstResultValue = 10;

function rateCandidates(results) {
  var scoresForCandidates = {};
  _.compact(results).forEach(lookForCandidates);

  function lookForCandidates(result, i) {
    var baseScore = baseValue + firstResultValue - i;
    result.beforeOfs.fromTitle.forEach(
      _.curry(addScoreForCandidate)(beforeOfValue + titleValue + baseScore)
    );
    result.beforeOfs.fromDesc.forEach(
      _.curry(addScoreForCandidate)(beforeOfValue + baseScore)
    );
    result.nouns.fromTitle.forEach(
      _.curry(addScoreForCandidate)(titleValue + baseScore)
    );
    result.nouns.fromDesc.forEach(
      _.curry(addScoreForCandidate)(baseScore)
    );
  }

  function addScoreForCandidate(score, candidate) {
    var existingScore = 0;
    if (candidate in scoresForCandidates) {
      existingScore = scoresForCandidates[candidate];
    }
    scoresForCandidates[candidate] = existingScore + score;
  }

  return scoresForCandidates;
}


module.exports = rateCandidates;
