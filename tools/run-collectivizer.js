var createCollectivizer = require('../collectivizer');

var cmdOpts = require('nomnom').parse();

if (!cmdOpts[0]) {
  console.log('Usage: node run-collectivizer.js <noun>');
  process.exit();
}

var collectivizer = createCollectivizer();

collectivizer.collectivize(cmdOpts[0], showResult);

function showResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(result);
  }
}
