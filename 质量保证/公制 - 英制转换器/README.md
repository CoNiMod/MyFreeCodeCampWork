# Metric-Imperial Converter

A full-stack JavaScript application that converts between metric and imperial units. This project is part of the FreeCodeCamp Quality Assurance certification.

## Features

- Convert between metric and imperial units
- Support for whole numbers, decimals, and fractions
- Handles 6 different unit types: gallons/liters, pounds/kilograms, miles/kilometers
- Input validation with clear error messages
- RESTful API endpoint
- Modern web interface

## Supported Conversions

| Imperial | Metric | Conversion Rate |
|----------|--------|-----------------|
| gal (gallons) | L (liters) | 1 gal = 3.78541 L |
| lbs (pounds) | kg (kilograms) | 1 lbs = 0.453592 kg |
| mi (miles) | km (kilometers) | 1 mi = 1.60934 km |

## Input Format

The application accepts inputs in the following formats:
- `10L` - 10 liters to gallons
- `1/2kg` - 0.5 kilograms to pounds  
- `3.5mi` - 3.5 miles to kilometers
- `lbs` - 1 pound to kilograms (defaults to 1)
- `2.5/3gal` - 0.833... gallons to liters

## API Endpoint

### GET /api/convert

Converts between metric and imperial units.

**Query Parameters:**
- `input` (required): The value and unit to convert (e.g., "10L", "1/2kg")

**Response Format:**
```json
{
  "initNum": 10,
  "initUnit": "L",
  "returnNum": 2.64172,
  "returnUnit": "gal",
  "string": "10 liters converts to 2.64172 gallons"
}
```

**Error Responses:**
- `{"error": "invalid number"}` - When the number format is invalid
- `{"error": "invalid unit"}` - When the unit is not supported
- `{"error": "invalid number and unit"}` - When both are invalid

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `sample.env` to `.env` and configure environment variables:
   ```
   NODE_ENV=test
   PORT=3000
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Running Tests
```bash
npm test
```

## Project Structure

```
├── controllers/
│   └── convertHandler.js    # Core conversion logic
├── routes/
│   └── api.js              # API routes
├── tests/
│   ├── 1_unit-tests.js     # Unit tests for convertHandler
│   └── 2_functional-tests.js # Functional tests for API
├── views/
│   └── index.html          # Web interface
├── server.js               # Express server
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables
```

## Testing

The project includes comprehensive testing:

### Unit Tests (16 tests)
- Number parsing (whole numbers, decimals, fractions)
- Unit validation and conversion
- Error handling for invalid inputs
- All supported unit conversions

### Functional Tests (5 tests)
- API endpoint functionality
- Input validation
- Error responses
- Conversion accuracy

## Technologies Used

- **Backend**: Node.js, Express.js
- **Testing**: Mocha, Chai, Chai-HTTP
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Development**: Nodemon for auto-restart

## Requirements Met

✅ All 16 unit tests pass  
✅ All 5 functional tests pass  
✅ Supports fractions, decimals, and decimal fractions  
✅ Handles invalid inputs gracefully  
✅ Returns proper error messages  
✅ Supports all 6 unit types  
✅ Handles case-insensitive unit input  
✅ Returns liters as uppercase 'L'  
✅ Rounds results to 5 decimal places  
✅ Provides spelled-out unit names  

## License

MIT License - see LICENSE file for details.
