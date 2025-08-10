const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha({
  ui: 'tdd',
  color: true
});

const testDir = path.join(__dirname, 'tests');

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function (file) {
  // Only keep the .js files
  return file.substr(-3) === '.js';
}).forEach(function (file) {
  mocha.addFile(path.join(testDir, file));
});

const runner = mocha.run(function (failures) {
  if (failures) {
    console.error(`${failures} tests failed`);
    process.exit(1);
  } else {
    console.log('All tests passed!');
    process.exit(0);
  }
});

module.exports = runner;
