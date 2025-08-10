class SudokuSolver {
  validate(puzzleString) {
    // Check if puzzle string is exactly 81 characters
    if (puzzleString.length !== 81) {
      return { valid: false, error: 'Expected puzzle to be 81 characters long' };
    }
    
    // Check if puzzle string contains only valid characters (1-9 and .)
    const validChars = /^[1-9.]+$/;
    if (!validChars.test(puzzleString)) {
      return { valid: false, error: 'Invalid characters in puzzle' };
    }
    
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStart = row * 9;
    for (let i = 0; i < 9; i++) {
      const index = rowStart + i;
      if (index !== column && puzzleString[index] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      const index = i * 9 + column;
      if (index !== row * 9 + column && puzzleString[index] === value.toString()) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const index = (regionRow + i) * 9 + (regionCol + j);
        if (index !== row * 9 + column && puzzleString[index] === value.toString()) {
          return false;
        }
      }
    }
    return true;
  }

  checkPlacement(puzzleString, coordinate, value) {
    // Parse coordinate (e.g., "A1" -> row 0, column 0)
    const row = coordinate.charCodeAt(0) - 65; // A=0, B=1, etc.
    const column = parseInt(coordinate[1]) - 1; // 1=0, 2=1, etc.
    
    if (row < 0 || row > 8 || column < 0 || column > 8) {
      return { valid: false, error: 'Invalid coordinate' };
    }
    
    if (value < 1 || value > 9 || !Number.isInteger(value)) {
      return { valid: false, error: 'Invalid value' };
    }
    
    const conflicts = [];
    
    if (!this.checkRowPlacement(puzzleString, row, column, value)) {
      conflicts.push('row');
    }
    
    if (!this.checkColPlacement(puzzleString, row, column, value)) {
      conflicts.push('column');
    }
    
    if (!this.checkRegionPlacement(puzzleString, row, column, value)) {
      conflicts.push('region');
    }
    
    if (conflicts.length > 0) {
      return { valid: false, conflict: conflicts };
    }
    
    return { valid: true };
  }

  solve(puzzleString) {
    // Validate puzzle string first
    const validation = this.validate(puzzleString);
    if (!validation.valid) {
      return validation;
    }
    
    // Convert string to 2D array for easier manipulation
    const board = [];
    for (let i = 0; i < 9; i++) {
      board[i] = [];
      for (let j = 0; j < 9; j++) {
        const char = puzzleString[i * 9 + j];
        board[i][j] = char === '.' ? 0 : parseInt(char);
      }
    }
    
    // Try to solve the puzzle
    if (this.solveBoard(board)) {
      // Convert back to string
      let solution = '';
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          solution += board[i][j].toString();
        }
      }
      return { solution };
    } else {
      return { error: 'Puzzle cannot be solved' };
    }
  }

  solveBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(board, row, col, num)) {
              board[row][col] = num;
              
              if (this.solveBoard(board)) {
                return true;
              }
              
              board[row][col] = 0; // backtrack
            }
          }
          return false; // no valid number found
        }
      }
    }
    return true; // all cells filled
  }

  isValidMove(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    
    // Check 3x3 region
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[regionRow + i][regionCol + j] === num) return false;
      }
    }
    
    return true;
  }
}

module.exports = SudokuSolver;
