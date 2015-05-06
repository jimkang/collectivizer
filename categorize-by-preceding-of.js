var _ = require('lodash');
// var notFalsePositiveGroupName = require('./not-false-positive-group-name');

function categorizeWords(phrase) {
  var result = {
    wordsPrecedingOf: [],
    wordsNotPrecedingOf: []
  };

  if (!phrase) {
    return result;
  }
  var words = phrase.toLowerCase().split(/[ ":.,;!?#\n]/);
  words = _.compact(words);
  var preceders = [];

  for (var i = 0; i < words.length; ++i) {
    var word = words[i];
    if (word === 'of' && i > 0) {
      preceders.push(words[i - 1]);
    }
  }

  preceders = _.uniq(preceders);

  result.wordsPrecedingOf = preceders;
  result.wordsNotPrecedingOf = _.without.apply(_, [words].concat(preceders));
  return result;
}

function categorizeByPrecedingOf(searchResult) {  
  var categorizedTitle = categorizeWords(searchResult.title);
  var categorizedDesc = categorizeWords(searchResult.description);

  return {
    wordsNotPrecedingOf: {
      title: categorizedTitle.wordsNotPrecedingOf,
      description: categorizedDesc.wordsNotPrecedingOf
    },
    wordsPrecedingOf: {
      title: categorizedTitle.wordsPrecedingOf,
      description: categorizedDesc.wordsPrecedingOf
    }
  };
}

module.exports = categorizeByPrecedingOf;
