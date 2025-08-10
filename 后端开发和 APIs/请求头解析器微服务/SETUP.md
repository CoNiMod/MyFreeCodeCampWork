# Setup Guide - Request Header Parser Microservice

## Prerequisites

Before you can run this microservice, you need to have the following installed:

### 1. Node.js
- **Download**: Visit [https://nodejs.org/](https://nodejs.org/)
- **Version**: 14.0.0 or higher (LTS version recommended)
- **Installation**: Follow the installer instructions for your operating system

### 2. Verify Installation
Open a terminal/command prompt and run:
```bash
node --version
npm --version
```

Both commands should return version numbers. If you get "command not found" errors, Node.js is not properly installed or not in your PATH.

## Quick Start

### Option 1: Using the provided scripts (Recommended)

#### Windows Users:
1. Double-click `start-server.bat`
2. The server will start automatically
3. Open your browser to `http://localhost:3000`

#### Unix/Linux/Mac Users:
1. Make the script executable: `chmod +x start-server.sh`
2. Run: `./start-server.sh`
3. Open your browser to `http://localhost:3000`

### Option 2: Manual setup

1. **Open a terminal/command prompt**
2. **Navigate to the project directory:**
   ```bash
   cd "path/to/MyFreeCodeCampWork/后端开发和 APIs/请求头解析器微服务"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open your browser** and go to `http://localhost:3000`

## Testing the API

### Method 1: Web Interface
1. Open `http://localhost:3000` in your browser
2. Click the "Test API" button
3. View your request header information

### Method 2: Direct API Call
1. Open `http://localhost:3000/api/whoami` in your browser
2. You should see a JSON response like:
   ```json
   {
     "ipaddress": "127.0.0.1",
     "language": "en-US,en;q=0.9",
     "software": "Mozilla/5.0..."
   }
   ```

### Method 3: Using cURL
```bash
curl http://localhost:3000/api/whoami
```

### Method 4: Using the test page
1. Open `test.html` in your browser
2. Use the test buttons to verify the API functionality

## Troubleshooting

### Common Issues

#### 1. "npm command not found"
- **Solution**: Install Node.js from [https://nodejs.org/](https://nodejs.org/)
- **Verify**: Run `node --version` and `npm --version`

#### 2. "Port 3000 is already in use"
- **Solution 1**: Stop other services using port 3000
- **Solution 2**: Change the port in `server.js`:
  ```javascript
  const PORT = process.env.PORT || 3001; // Change to 3001 or another port
  ```

#### 3. "Cannot find module 'express'"
- **Solution**: Run `npm install` to install dependencies

#### 4. "Permission denied" (Unix/Linux/Mac)
- **Solution**: Make the shell script executable:
  ```bash
  chmod +x start-server.sh
  ```

#### 5. Server starts but API doesn't work
- **Check**: Make sure you're using the correct URL: `http://localhost:3000/api/whoami`
- **Verify**: Check the terminal for any error messages
- **Test**: Try accessing the root page `http://localhost:3000` first

### Getting Help

1. **Check the terminal output** for error messages
2. **Verify Node.js installation** with `node --version`
3. **Check if dependencies are installed** - look for `node_modules` folder
4. **Try a different port** if 3000 is busy
5. **Restart the terminal** and try again

## Development

### Development Mode
For development with auto-restart:
```bash
npm run dev
```

### File Structure
```
请求头解析器微服务/
├── package.json          # Dependencies and scripts
├── server.js            # Main server file
├── public/              # Web interface files
│   ├── index.html       # Main page
│   ├── style.css        # Styling
│   └── script.js        # Frontend logic
├── test.html            # Test page
├── start-server.bat     # Windows startup script
├── start-server.sh      # Unix startup script
├── README.md            # Project documentation
├── SETUP.md             # This setup guide
└── .gitignore           # Git ignore file
```

### Making Changes
- **Backend**: Edit `server.js`
- **Frontend**: Edit files in the `public/` folder
- **Restart**: Stop the server (Ctrl+C) and start it again

## Deployment

This microservice can be deployed to various platforms:

### Heroku
1. Create a Heroku account
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Deploy: `git push heroku main`

### Railway
1. Connect your GitHub repository
2. Railway will automatically deploy your app

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`

## Support

If you're still having issues:
1. Check the FreeCodeCamp forum
2. Review the error messages in your terminal
3. Verify all prerequisites are met
4. Try running the commands step by step

## Success Indicators

Your microservice is working correctly when:
- ✅ Server starts without errors
- ✅ You can access `http://localhost:3000`
- ✅ API endpoint `/api/whoami` returns JSON
- ✅ JSON contains `ipaddress`, `language`, and `software` keys
- ✅ All FreeCodeCamp tests pass

Good luck with your FreeCodeCamp certification!
