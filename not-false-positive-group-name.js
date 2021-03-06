var beforeForFalsePositives = [
  'group',
  'list',
  'sort',
  'for',
  'all',
  'idiom',
  'dictionary',
  'many',
  'table',
  'anagram',
  'type',
  'types',
  'varieties',
  'variety',
  'primarily', // ??
  'world',
  'catalog',
  'manufacturer',
  'made',
  'science',
  'history',
  'journal',
  'future',
  'defense',
  'number',
  'are',
  'category',
  'definition',
  'kind',
  'some',
  'instead',
  'lot',
  'mar',
  'antonym',
  'synonym',
  'meaning',
  'etymology',
  'english',
  'thesaurus',
  'translation',
  'pronounciation',
  'noun',
  'word',
  'relevance',
  'pronunciation',
  'webster',
  'merriam',
  'edu',
  'howtosay',
  'overview',
  'spelling'
];

function notFalsePositiveGroupName(word) {
  return beforeForFalsePositives.indexOf(word) === -1;
}

module.exports = notFalsePositiveGroupName;
