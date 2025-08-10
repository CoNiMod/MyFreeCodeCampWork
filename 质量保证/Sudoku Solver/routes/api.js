const express = require('express');
const SudokuSolver = require('../controllers/sudoku-solver.js');

const router = express.Router();

// POST /api/solve
router.post('/solve', (req, res) => {
  const { puzzle } = req.body;
  
  // Check if puzzle field is missing
  if (!puzzle) {
    return res.json({ error: 'Required field missing' });
  }
  
  const solver = new SudokuSolver();
  
  // Validate puzzle string
  const validation = solver.validate(puzzle);
  if (!validation.valid) {
    return res.json({ error: validation.error });
  }
  
  // Try to solve the puzzle
  const result = solver.solve(puzzle);
  if (result.error) {
    return res.json({ error: result.error });
  }
  
  res.json({ solution: result.solution });
});

// POST /api/check
router.post('/check', (req, res) => {
  const { puzzle, coordinate, value } = req.body;
  
  // Check if required fields are missing
  if (!puzzle || !coordinate || value === undefined) {
    return res.json({ error: 'Required field(s) missing' });
  }
  
  const solver = new SudokuSolver();
  
  // Validate puzzle string
  const validation = solver.validate(puzzle);
  if (!validation.valid) {
    return res.json({ error: validation.error });
  }
  
  // Check coordinate format (A1-I9)
  const coordRegex = /^[A-I][1-9]$/;
  if (!coordRegex.test(coordinate)) {
    return res.json({ error: 'Invalid coordinate' });
  }
  
  // Check value (1-9)
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 9) {
    return res.json({ error: 'Invalid value' });
  }
  
  // Check placement
  const result = solver.checkPlacement(puzzle, coordinate, numValue);
  res.json(result);
});

module.exports = router;
