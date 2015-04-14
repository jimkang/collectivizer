var _ = require('lodash');
var notFalsePositiveGroupName = require('./not-false-positive-group-name');

function getWordsPrecedingOf(phrase) {
  var words = phrase.toLowerCase().split(/[ ":.,;!?#]/);
  words = _.compact(words);
  var preceders = [];

  for (var i = 0; i < words.length; ++i) {
    var word = words[i];
    if (word === 'of' && i > 0) {
      preceders.push(words[i - 1]);
    }
  }

  return _.uniq(preceders);
}

function getCandidatesPrecedingOf(searchResult) {
  return {
    fromTitle: getWordsPrecedingOf(searchResult.title)
      .filter(notFalsePositiveGroupName),
    fromDesc: getWordsPrecedingOf(searchResult.description)
      .filter(notFalsePositiveGroupName)
  };
}

module.exports = getCandidatesPrecedingOf;
