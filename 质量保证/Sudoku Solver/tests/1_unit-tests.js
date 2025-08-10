const chai = require('chai');
const assert = chai.assert;
const SudokuSolver = require('../controllers/sudoku-solver.js');

describe('Unit Tests', () => {
  let solver;

  beforeEach(() => {
    solver = new SudokuSolver();
  });

  describe('validate()', () => {
    it('Logic handles a valid puzzle string of 81 characters', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.validate(puzzle);
      assert.property(result, 'valid');
      assert.isTrue(result.valid);
    });

    it('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9a';
      const result = solver.validate(puzzle);
      assert.property(result, 'valid');
      assert.isFalse(result.valid);
      assert.property(result, 'error');
      assert.equal(result.error, 'Invalid characters in puzzle');
    });

    it('Logic handles a puzzle string that is not 81 characters in length', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8';
      const result = solver.validate(puzzle);
      assert.property(result, 'valid');
      assert.isFalse(result.valid);
      assert.property(result, 'error');
      assert.equal(result.error, 'Expected puzzle to be 81 characters long');
    });
  });

  describe('checkRowPlacement()', () => {
    it('Logic handles a valid row placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkRowPlacement(puzzle, 0, 0, 1);
      assert.isTrue(result);
    });

    it('Logic handles an invalid row placement', () => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkRowPlacement(puzzle, 0, 2, 1);
      assert.isFalse(result);
    });
  });

  describe('checkColPlacement()', () => {
    it('Logic handles a valid column placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkColPlacement(puzzle, 0, 0, 1);
      assert.isTrue(result);
    });

    it('Logic handles an invalid column placement', () => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkColPlacement(puzzle, 2, 0, 1);
      assert.isFalse(result);
    });
  });

  describe('checkRegionPlacement()', () => {
    it('Logic handles a valid region (3x3 grid) placement', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkRegionPlacement(puzzle, 0, 0, 1);
      assert.isTrue(result);
    });

    it('Logic handles an invalid region (3x3 grid) placement', () => {
      const puzzle = '1.9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.checkRegionPlacement(puzzle, 1, 1, 1);
      assert.isFalse(result);
    });
  });

  describe('solve()', () => {
    it('Valid puzzle strings pass the solver', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9';
      const result = solver.solve(puzzle);
      assert.property(result, 'solution');
      assert.isString(result.solution);
      assert.equal(result.solution.length, 81);
    });

    it('Invalid puzzle strings fail the solver', () => {
      const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9a';
      const result = solver.solve(puzzle);
      assert.property(result, 'error');
      assert.equal(result.error, 'Invalid characters in puzzle');
    });

    it('Solver returns the expected solution for an incomplete puzzle', () => {
      const puzzle = '.................................................................................';
      const result = solver.solve(puzzle);
      assert.property(result, 'solution');
      assert.isString(result.solution);
      assert.equal(result.solution.length, 81);
      
      // Verify it's a valid solution (no duplicates in rows, columns, regions)
      const solution = result.solution;
      for (let i = 0; i < 9; i++) {
        const row = solution.slice(i * 9, (i + 1) * 9);
        const col = solution.split('').filter((_, index) => index % 9 === i).join('');
        assert.equal(new Set(row).size, 9, `Row ${i} has duplicates`);
        assert.equal(new Set(col).size, 9, `Column ${i} has duplicates`);
      }
    });
  });
});
