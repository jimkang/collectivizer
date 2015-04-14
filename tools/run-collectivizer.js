var createCollectivizer = require('../collectivizer');
var config = require('../config');

var cmdOpts = require('nomnom').parse();

if (!cmdOpts[0]) {
  console.log('Usage: node run-collectivizer.js <noun>');
  process.exit();
}

var collectivizer = createCollectivizer({
  wordnikAPIKey: config.wordnikAPIKey
});

collectivizer.collectivize(cmdOpts[0], showResult);

function showResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(result);
    // "The collective noun for ____ is ____. A ____ of _____s."
  }
}
