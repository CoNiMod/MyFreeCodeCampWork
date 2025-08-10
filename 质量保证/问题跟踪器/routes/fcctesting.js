const runner = require('../test-runner');

module.exports = function (app) {
  
  app.route('/_api/get-tests')
    .get(function (req, res, next) {
      console.log('request to get tests');
      if (runner.reporter) {
        res.json({ status: 'ok', tests: runner.reporter.suite.suites });
      } else {
        res.json({ status: 'tests not started' });
      }
    });

  app.route('/_api/run-tests')
    .post(function (req, res, next) {
      console.log('request to run tests');
      if (!runner.reporter) {
        runner.run();
        res.json({ status: 'tests started' });
      } else {
        res.json({ status: 'tests already running' });
      }
    });

  app.route('/_api/results')
    .get(function (req, res, next) {
      console.log('request to get test results');
      if (runner.reporter) {
        res.json({ status: 'ok', results: runner.reporter.results });
      } else {
        res.json({ status: 'tests not started' });
      }
    });
};
