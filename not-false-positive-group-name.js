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
  'anagram'
];

function notFalsePositiveGroupName(word) {
  return beforeForFalsePositives.indexOf(word) === -1;
}

module.exports = notFalsePositiveGroupName;
