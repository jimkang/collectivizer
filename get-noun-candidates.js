var queue = require('queue-async');
var notFalsePositiveGroupName = require('./not-false-positive-group-name');

function getNounCandidates(wordnok, searchResult, done) {
  var q = queue();
  q.defer(getStrictNounsFromList, wordnok, searchResult.title);
  q.defer(getStrictNounsFromList, wordnok, searchResult.description);
  q.await(passBackNouns);

  function passBackNouns(error, titleNouns, descNouns) {
    if (error) {
      done(error);
    }
    else {
      var report = {
        fromTitle: titleNouns.filter(notFalsePositiveGroupName),
        fromDesc: descNouns.filter(notFalsePositiveGroupName)
      };
      done(error, report);
    }
  }
}

function getStrictNounsFromList(wordnok, words, doneGettingNouns) {
  wordnok.getPartsOfSpeechForMultipleWords(words, filterToNouns);

  function filterToNouns(error, partsOfSpeech) {
    if (!error) {
      var nouns = [];
      if (Array.isArray(partsOfSpeech)) {
        nouns = words.filter(isExclusivelyANoun);
      }
    }

    doneGettingNouns(error, nouns);

    function isExclusivelyANoun(word, i) {
      if (partsOfSpeech.length > i) {
        var correspondingPartsOfSpeech = partsOfSpeech[i];
        return correspondingPartsOfSpeech.every(posIsANoun);
      }
      return false;
    }
  }
}


function posIsANoun(partsOfSpeech) {
  return partsOfSpeech === 'noun';
}

module.exports  = getNounCandidates;
