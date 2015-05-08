var test = require('tape');
var getModifierForWordFreq = require('../get-modifier-for-word-freq');
var _ = require('lodash');

var frequenciesForWords = {
  ointment: 0,
  pdf: 50,
  '176k': 0,
  wiley: 0,
  library: 325,
  drug: 558,
  researchgate: 0,
  sector: 397,
  investigation: 529,
  country: 2666,
  economics: 157,
  internet: 450,
  france: 6,
  exposition: 5,
  test: 651,
  protection: 337,
  ller: 0,
  bor: 0,
  suspension: 71,
  takeru: 0,
  higuchi: 0,
  article: 1323,
  first: 7477,
  equation: 41,
  pmid: 0,
  pubmed: 0,
  medline: 0,
  expression: 216,
  conve: 0,
  process: 1215,
  periodontitis: 0,
  estrelai: 9999999,
  roberto: 0,
  hollandii: 9999999,
  pedro: 15,
  fel: 0,
  cio: 0,
  estrada: 0,
  memorandum: 17,
  canada: 78,
  border: 435,
  agency: 482,
  cbsa: 0,
  policy: 1468,
  regeneration: 4,
  root: 110,
  fracture: 8,
  dentine: 0,
  yassen1: 9999999,
  vail3: 9999999,
  chu1: 0,
  health: 1626,
  law: 1953,
  book: 2713,
  pandectarum: 9999999,
  medicinae: 0,
  matthaeus: 0,
  sylvaticus: 0,
  jama: 0,
  ol: 37,
  andr: 0,
  professor: 333,
  vice: 327,
  dean: 30,
  department: 376,
  mi: 24,
  deputy: 162,
  yassen: 0,
  gh: 0,
  chu: 0,
  tg: 0,
  ma: 47,
  allen: 2,
  mr: 18,
  murray: 0,
  pe: 5,
  platt: 0,
  aud: 0,
  million: 3005,
  european: 11,
  union: 303,
  ue: 0,
  june: 3,
  ec: 2,
  will: 18228,
  immunodermatology: 0,
  epicutane: 9999999,
  prick: 6,
  immunofluorescence: 0,
  rast: 0,
  ip: 26,
  market: 1886,
  ralf: 0,
  perrey: 0
};

test('Basic tests', function basicTests(t) {
  var expectedScoresForWords = {
    rate: 0,
    ointment: 20,
    suspension: 10,
    takeru: 20,
    higuchi: 20,
    article: 4,
    first: 2,
    pdf: 12,
    '176k': 20,
    wiley: 20,
    library: 8,
    equation: 12,
    pmid: 20,
    pubmed: 20,
    medline: 20,
    drug: 6,
    expression: 8,
    conve: 20,
    process: 4,
    periodontitis: 20,
    estrelai: 0,
    roberto: 20,
    hollandii: 0,
    pedro: 14,
    fel: 20,
    cio: 20,
    estrada: 20,
    classification: 0,
    memorandum: 14,
    canada: 10,
    border: 6,
    agency: 6,
    cbsa: 20,
    policy: 4,
    effect: 0,
    microhardness: 0,
    researchgate: 20,
    regeneration: 16,
    root: 10,
    fracture: 14,
    dentine: 20,
    yassen1: 0,
    vail3: 0,
    chu1: 20,
    ministry: 0,
    sector: 8,
    investigation: 6,
    health: 4,
    law: 4,
    edition: 0,
    book: 4,
    pandectarum: 0,
    medicinae: 20,
    matthaeus: 20,
    sylvaticus: 20,
    country: 4,
    jama: 20,
    head: 0,
    ol: 12,
    andr: 20,
    professor: 8,
    vice: 8,
    dean: 12,
    department: 8,
    mi: 12,
    deputy: 8,
    yassen: 20,
    gh: 20,
    chu: 20,
    tg: 20,
    ma: 12,
    allen: 18,
    mr: 14,
    murray: 20,
    pe: 16,
    platt: 20,
    january: 0,
    december: 0,
    economics: 8,
    aud: 20,
    million: 2,
    sale: 0,
    internet: 6,
    france: 16,
    european: 14,
    union: 8,
    ue: 20,
    june: 16,
    ec: 18,
    exposition: 16,
    test: 6,
    will: 0,
    immunodermatology: 20,
    epicutane: 0,
    prick: 16,
    immunofluorescence: 20,
    rast: 20,
    protection: 8,
    ller: 20,
    bor: 20,
    ip: 12,
    market: 4,
    ralf: 20
  };

  var words = Object.keys(expectedScoresForWords);
  t.plan(words.length);

  var newScoresForWords = {};

  words.forEach(testWithWord);

  function testWithWord(word) {
    newScoresForWords[word] = getModifierForWordFreq(frequenciesForWords, word);
    t.equal(
      getModifierForWordFreq(frequenciesForWords, word),
      expectedScoresForWords[word],
      'Score is correct.'
    );
  }

  console.log(newScoresForWords);
});
