# Stock Price Checker

A full-stack JavaScript application that allows users to check stock prices and like their favorite stocks. Built for the FreeCodeCamp Information Security certification.

## Features

- **Single Stock Lookup**: Get real-time stock prices for any NASDAQ stock symbol
- **Stock Comparison**: Compare two stocks side by side
- **Like System**: Like stocks to track popularity (one like per IP address)
- **Privacy Compliant**: IP addresses are anonymized using SHA-256 hashing
- **Responsive Design**: Modern, mobile-friendly interface
- **Security Features**: Content Security Policy and other security headers

## API Endpoints

### GET /api/stock-prices

**Parameters:**
- `stock` (required): Stock symbol (string) or array of two stock symbols
- `like` (optional): Set to "true" to like the stock(s)

**Single Stock Response:**
```json
{
  "stockData": {
    "stock": "AAPL",
    "price": 150.25,
    "likes": 5
  }
}
```

**Two Stocks Response:**
```json
{
  "stockData": [
    {
      "stock": "AAPL",
      "price": 150.25,
      "rel_likes": 2
    },
    {
      "stock": "GOOGL",
      "price": 2750.50,
      "rel_likes": -2
    }
  ]
}
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp sample.env .env
   # Edit .env with your configuration
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Development

- **Development mode**: `npm run dev`
- **Run tests**: `npm test`

## Testing

The project includes comprehensive functional tests that verify:
- Viewing single stocks
- Viewing and liking single stocks
- Viewing multiple stocks
- Viewing and liking multiple stocks
- Proper data structure and types

## Security Features

- **Content Security Policy**: Restricts script and CSS loading to same origin
- **IP Anonymization**: IP addresses are hashed before storage for privacy compliance
- **Input Validation**: All inputs are validated and sanitized
- **Error Handling**: Comprehensive error handling without information leakage

## Privacy Considerations

This application complies with data privacy laws by:
- Anonymizing IP addresses using SHA-256 hashing
- Only storing hashed versions of IP addresses
- Implementing one-like-per-IP restrictions
- Not collecting or storing personal information

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Security**: Helmet.js for security headers
- **Testing**: Mocha, Chai, Chai-HTTP
- **API**: FreeCodeCamp Stock Price Proxy API

## Project Structure

```
├── models/
│   └── stock.js          # MongoDB schema and methods
├── routes/
│   └── api.js            # API endpoints
├── public/
│   ├── style.css         # Application styles
│   └── script.js         # Frontend JavaScript
├── views/
│   └── index.html        # Main application page
├── tests/
│   └── 2_functional-tests.js  # Functional test suite
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
└── sample.env            # Environment configuration template
```

## License

MIT License - see LICENSE file for details.
