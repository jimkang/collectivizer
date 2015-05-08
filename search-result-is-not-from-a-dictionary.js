var _ = require('lodash');

var dictionaryIndicatingWords = [
  'translation',
  'translations',
  'meaning',
  'meanings',
  'definition',
  'definitions',
  'dictionary'
];

function searchResultIsNotFromADictionary(searchResult) {
  var verdict = true;
  var lowercaseTitle = searchResult.title.toLowerCase();
  var titleWords = lowercaseTitle.split(/\W/);
  var indicatorsInTitle = _.intersection(dictionaryIndicatingWords, titleWords);
  return indicatorsInTitle.length === 0;
}

module.exports = searchResultIsNotFromADictionary;
