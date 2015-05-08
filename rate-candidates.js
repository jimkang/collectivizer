var _ = require('lodash');
var getModifierForWordFreq = require('./get-modifier-for-word-freq');

var titleValue = 2;
var beforeOfValue = 15;
var baseValue = 1;
var firstResultValue = 5;

var frequenciesForWords = {};

function rateCandidates(results, wordnok, done) {
  populateFrequencyDict(results, wordnok, scoreAndPassback);

  function scoreAndPassback(error, results) {
    if (error) {
      done(error);
    }
    else {
      done(error, scoreCandidates(results));
    }
  }  
}

function populateFrequencyDict(results, wordnok, populateDone) {
  var reports = _.pluck(results, 'nouns');
  var titleNouns = getWordsFromReports(reports, 'fromTitle');
  var descNouns = getWordsFromReports(reports, 'fromDesc');
  var words = _.uniq(titleNouns.concat(descNouns));

  wordnok.getWordFrequencies(words, putWordFreqsInDict);

  function putWordFreqsInDict(error, frequencies) {
    if (error) {
      populateDone(error);
    }
    else if (words.length !== frequencies.length) {
      populateDone(new Error('Wrong number of frequencies received.'));
    }
    else {
      for (var i = 0; i < words.length; ++i) {
        frequenciesForWords[words[i]] = frequencies[i];
      }
      // console.log(frequenciesForWords);
      populateDone(error, results);
    }
  }  
}

function scoreCandidates(results) {
  var scoresForCandidates = {};
  _.compact(results).forEach(lookForCandidates);

  function lookForCandidates(result, i) {
    var baseScore = baseValue + firstResultValue - i;
    if (baseScore < 1) {
      baseScore = 0;
    }

    result.beforeOfNouns.fromTitle.forEach(
      _.curry(addScoreForCandidate)(beforeOfValue + titleValue + baseScore)
    );
    result.beforeOfNouns.fromDesc.forEach(
      _.curry(addScoreForCandidate)(beforeOfValue + baseScore)
    );
    result.nouns.fromTitle.forEach(
      _.curry(addScoreForCandidate)(titleValue + baseScore)
    );
    result.nouns.fromDesc.forEach(
      _.curry(addScoreForCandidate)(baseScore)
    );
  }

  function addScoreForCandidate(baseScore, candidate) {
    var existingScore = 0;
    if (candidate in scoresForCandidates) {
      existingScore = scoresForCandidates[candidate];
    }

    var score = baseScore + getModifierForWordFreq(
      frequenciesForWords, candidate);

    if (score > existingScore) {
      scoresForCandidates[candidate] = score + ~~(existingScore/4);
    }
    else {
      scoresForCandidates[candidate] = existingScore + ~~(score/4);
    }
  }

  return scoresForCandidates;
}

function getWordsFromReports(reports, reportProperty) {
  return _(reports)
    .pluck(reportProperty)
    .flatten()
    .compact()
    .value();
}

module.exports = rateCandidates;
