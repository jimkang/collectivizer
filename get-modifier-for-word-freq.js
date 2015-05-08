var rareWordModifierBase = 12;

function getModifierForWordFreq(frequenciesForWords, word) {
  var modifier;

  var freq = frequenciesForWords[word];
  if (freq === undefined || freq === 9999999) {
    modifier = 0;
  }
  else if (freq === 0) {
    modifier = rareWordModifierBase;
  }
  else {
    modifier = ~~(10 - Math.log(freq));
    if (modifier < 0) {
      modifier = rareWordModifierBase;
    }
    else {
      modifier = ~~(modifier * rareWordModifierBase/10)
    }
  }

  return modifier;
}

module.exports = getModifierForWordFreq;
