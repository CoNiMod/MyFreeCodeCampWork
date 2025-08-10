# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   # Copy the sample environment file
   cp sample.env .env
   
   # Edit .env and set your MongoDB connection
   # For local MongoDB:
   DB_URI=mongodb://localhost:27017/issue-tracker
   
   # For MongoDB Atlas:
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/issue-tracker
   ```

3. **Start MongoDB:**
   - **Windows:** Run `mongod` in a separate terminal
   - **macOS/Linux:** `sudo systemctl start mongod`

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the application:**
   - Open `http://localhost:3000` in your browser
   - Use the web interface to create and manage issues
   - Or use `test.html` to test the API directly

## Running Tests

1. **Set test environment in .env:**
   ```env
   NODE_ENV=test
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

## API Testing

The `test.html` file provides a simple interface to test all API endpoints:
- Create issues
- Retrieve issues
- Update issues
- Delete issues

## Troubleshooting

- **Port already in use:** Change PORT in .env file
- **MongoDB connection failed:** Check if MongoDB is running and connection string is correct
- **Tests failing:** Ensure MongoDB is running and NODE_ENV=test is set

## Project Structure

- `server.js` - Main server file
- `routes/api.js` - API endpoints
- `models/issue.js` - Database model
- `tests/2_functional-tests.js` - Functional tests
- `views/index.html` - Main web interface
- `public/` - Frontend assets
