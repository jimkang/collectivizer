var exportMethods = require('export-methods');
var canonicalizer = require('canonicalizer');
var createIsCool = require('iscool');

var iscool = createIsCool({
  // logger: console,
  tragedyHappenedRecently: false
});

function createCandidateWordFilters(opts) {
  var singular;
  var plural;

  if (opts) {
    singular = opts.singularFormOfRoot;
    plural = opts.pluralFormOfRoot;
  }

  function doesNotContainNoun(word) {
    return word.indexOf(singular) === -1 && word.indexOf(plural) === -1;
  }

  // Filter out candidates that are contained in the subject. e.g Should 
  // not use "event" as a collective noun for "media event".
  function nounDoesNotContainCandidate(candidate) {
    return singular.indexOf(candidate) === -1;
  }

  function wordIsSingular(word) {
    var singularWord = canonicalizer.getSingularAndPluralForms(word)[0];
    return singularWord === word;
  }

  function isAtLeastTwoChars(word) {
    return word.length > 1;
  }

  function applyAllFiltersToWords(words) {
    return words
      .filter(isAtLeastTwoChars)
      .filter(isNaN)
      .filter(doesNotContainNoun)
      .filter(nounDoesNotContainCandidate)
      .filter(wordIsSingular)
      .filter(iscool);
  }

  return exportMethods(
    doesNotContainNoun,
    nounDoesNotContainCandidate,
    wordIsSingular,
    iscool,
    applyAllFiltersToWords
  );
}


module.exports = createCandidateWordFilters;
