const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/solve', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      
      chai.request(app)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'solution');
          assert.isString(res.body.solution);
          assert.equal(res.body.solution.length, 81);
          done();
        });
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
      chai.request(app)
        .post('/api/solve')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9a';
      
      chai.request(app)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8';
      
      chai.request(app)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
      const puzzle = '123456789456789123789123456234567891567891234891234567345678912678912345912345678';
      
      chai.request(app)
        .post('/api/solve')
        .send({ puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
    });
  });

  suite('POST /api/check', () => {
    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'A1';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isBoolean(res.body.valid);
          done();
        });
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'A2';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);
          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'B1';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);
          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'column');
          assert.include(res.body.conflict, 'region');
          done();
        });
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'A2';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'valid');
          assert.isFalse(res.body.valid);
          assert.property(res.body, 'conflict');
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          done();
        });
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
      chai.request(app)
        .post('/api/check')
        .send({ puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        });
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9a';
      const coordinate = 'A1';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

    test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8';
      const coordinate = 'A1';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'Z1';
      const value = 1;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid coordinate');
          done();
        });
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const coordinate = 'A1';
      const value = 10;
      
      chai.request(app)
        .post('/api/check')
        .send({ puzzle, coordinate, value })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'Invalid value');
          done();
        });
    });
  });
});
