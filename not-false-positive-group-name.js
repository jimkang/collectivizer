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
  'history'  
];

function notFalsePositiveGroupName(word) {
  return beforeForFalsePositives.indexOf(word) === -1;
}

module.exports = notFalsePositiveGroupName;
