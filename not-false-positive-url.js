var falsePositiveURLFragments = [
  'dictionary',
  'word',
  'facebook',
  'anagram'
];


function notFalsePositiveURL(url) {
  function fragmentIsNotInURL(fragment) {
    return url.indexOf(fragment) === -1;
  }

  return url && falsePositiveURLFragments.every(fragmentIsNotInURL);
}

module.exports = notFalsePositiveURL;
