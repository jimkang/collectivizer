var test = require('tape');
var rateCandidates = require('../rate-candidates.js');
var astronautResults = require('./data/astronaut-results');
var _ = require('lodash');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;

var mockWordnok = {
  getWordFrequencies: function mockGetWordFrequencies(words, done) {
    callBackOnNextTick(done, null, words.map(get100));
  }
};

function get100() {
  return 100;
}

test('Basic test', function basicTest(t) {
  t.plan(3);

  var scoresForCandidates = rateCandidates(
    astronautResults, mockWordnok, checkResults
  );

  function checkResults(error, scoresForCandidates) {
    var candidates = _.keys(scoresForCandidates);
    var scores = _.values(scoresForCandidates);
    t.ok(candidates.length > 0, 'There is at least one candidate.');
    t.ok(candidates.every(isString), 'candidates are strings.');
    t.ok(scores.every(isNumber), 'scores are numbers.');

    var sortedCandidatesForScores = _.invert(scoresForCandidates);
    console.log(JSON.stringify(sortedCandidatesForScores, null, '  '));
  }
});

function isString(x) {
  return typeof x === 'string';
}

function isNumber(x) {
  return typeof x === 'number';
}
