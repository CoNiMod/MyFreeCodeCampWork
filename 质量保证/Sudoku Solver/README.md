# Sudoku Solver

A full stack JavaScript application that solves Sudoku puzzles and validates puzzle placements. Built for the FreeCodeCamp Quality Assurance certification project.

## Features

- **Puzzle Solving**: Solve any valid 9x9 Sudoku puzzle
- **Placement Validation**: Check if a number can be placed at a specific coordinate
- **Input Validation**: Ensures puzzle strings are exactly 81 characters with valid characters (1-9 and .)
- **Modern UI**: Clean, responsive interface with real-time feedback

## API Endpoints

### POST /api/solve
Solves a Sudoku puzzle.

**Request Body:**
```json
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9"
}
```

**Response:**
```json
{
  "solution": "123456789456789123789123456234567891567891234891234567345678912678912345912345678"
}
```

### POST /api/check
Checks if a number can be placed at a specific coordinate.

**Request Body:**
```json
{
  "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.2.2.4.1..9...5.7.2..1.4.3.9.8..7.4.1....2.5.1.243.6.7.2.1.9.4.1.2.3.4.5.6.7.8.9",
  "coordinate": "A1",
  "value": 1
}
```

**Response:**
```json
{
  "valid": true
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `sample.env`
4. Set `NODE_ENV=test` for running tests

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
npm test
```

## Project Structure

```
├── controllers/
│   ├── sudoku-solver.js    # Core Sudoku solving logic
│   └── puzzle-strings.js   # Sample puzzle data
├── routes/
│   └── api.js             # API endpoint definitions
├── views/
│   ├── index.html         # Main application page
│   ├── style.css          # Application styles
│   └── script.js          # Frontend JavaScript
├── tests/
│   ├── 1_unit-tests.js    # Unit tests for solver logic
│   └── 2_functional-tests.js # Functional tests for API endpoints
├── server.js              # Express server setup
└── package.json           # Project dependencies
```

## Testing

The project includes comprehensive test coverage:

- **12 Unit Tests**: Testing the core Sudoku solver logic
- **14 Functional Tests**: Testing the API endpoints

Run tests with:
```bash
npm test
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Testing**: Mocha, Chai, Chai-HTTP
- **Styling**: CSS Grid, Flexbox, CSS Variables

## License

MIT License
