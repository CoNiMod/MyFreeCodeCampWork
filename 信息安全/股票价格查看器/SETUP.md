# Stock Price Checker - Setup Guide

This guide will help you set up and run the Stock Price Checker application.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (running locally or accessible via connection string)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
cd "MyFreeCodeCampWork/信息安全/股票价格查看器"
npm install
```

### 2. Set Up Environment Variables

Copy the sample environment file and configure it:

```bash
cp sample.env .env
```

Edit the `.env` file with your configuration:

```env
NODE_ENV=test
PORT=3000
DB=mongodb://localhost:27017/stock-checker
```

**Important**: Set `NODE_ENV=test` as required by FreeCodeCamp.

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start manually:
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

**macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or start manually:
mongod
```

### 4. Start the Application

**Option 1: Using npm scripts**
```bash
npm start
```

**Option 2: Using start scripts**
- Windows: Double-click `start-server.bat`
- macOS/Linux: `./start-server.sh`

**Option 3: Development mode (with auto-restart)**
```bash
npm run dev
```

### 5. Access the Application

- **Main Application**: http://localhost:3000
- **API Test Page**: http://localhost:3000/test.html
- **API Endpoint**: http://localhost:3000/api/stock-prices

## Running Tests

Execute the test suite:

```bash
npm test
```

Or use the test runner:

```bash
node test-runner.js
```

## API Testing

### Manual Testing

1. Open http://localhost:3000/test.html
2. Use the test interface to verify API functionality
3. Test various scenarios including error cases

### Functional Tests

The project includes 5 functional tests that verify:
- Single stock viewing
- Single stock with like
- Single stock with repeated like
- Two stocks comparison
- Two stocks with likes

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify MongoDB port (default: 27017)

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port: `lsof -ti:3000 | xargs kill -9`

3. **Module Not Found Errors**
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

4. **Tests Failing**
   - Ensure MongoDB is running
   - Check that `NODE_ENV=test` is set
   - Verify all dependencies are installed

### Debug Mode

Enable debug logging by setting environment variable:

```bash
DEBUG=* npm start
```

## Project Structure

```
├── models/stock.js              # Database model
├── routes/api.js                # API endpoints
├── public/                      # Static assets
│   ├── style.css               # CSS styles
│   └── script.js               # Frontend JavaScript
├── views/index.html             # Main page
├── tests/2_functional-tests.js # Test suite
├── server.js                    # Main server
├── package.json                 # Dependencies
└── .env                         # Environment config
```

## Security Features

- Content Security Policy (CSP) headers
- IP address anonymization for privacy
- Input validation and sanitization
- Error handling without information leakage

## Next Steps

After setup:
1. Test the application functionality
2. Run the test suite
3. Customize the application as needed
4. Deploy to your preferred hosting platform

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Check MongoDB logs for database issues
4. Review Node.js console output for application errors
