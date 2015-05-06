var exportMethods = require('export-methods');
var canonicalizer = require('canonicalizer');

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

  function applyAllFiltersToWords(words) {
    return words
      .filter(isNaN)
      .filter(doesNotContainNoun)
      .filter(nounDoesNotContainCandidate)
      .filter(wordIsSingular);
  }

// TODO: iscool, no numbers.

  return exportMethods(
    doesNotContainNoun,
    nounDoesNotContainCandidate,
    wordIsSingular,
    applyAllFiltersToWords
  );
}


module.exports = createCandidateWordFilters;
