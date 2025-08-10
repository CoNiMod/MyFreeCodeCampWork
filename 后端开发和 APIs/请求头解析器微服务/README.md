# Request Header Parser Microservice

A full-stack JavaScript application that parses request headers and returns client information. Built for the FreeCodeCamp Backend Development and APIs certification.

## Live Demo

This service is functionally similar to: https://request-header-parser-microservice.freecodecamp.rocks/

## Features

- **IP Address Detection**: Automatically detects and returns the client's IP address
- **Language Preference**: Extracts the client's preferred language from browser headers
- **Software Information**: Provides details about the client's browser and operating system
- **RESTful API**: Clean, simple API endpoint at `/api/whoami`
- **Modern UI**: Beautiful, responsive web interface for testing the API
- **Error Handling**: Comprehensive error handling and user feedback

## API Endpoint

### GET /api/whoami

Returns a JSON object containing:

```json
{
  "ipaddress": "192.168.1.100",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
}
```

#### Response Fields

- **ipaddress**: The client's IP address as seen by the server
- **language**: The client's preferred language from the `Accept-Language` header
- **software**: The client's browser and OS information from the `User-Agent` header

## Project Structure

```
请求头解析器微服务/
├── package.json          # Project dependencies and scripts
├── server.js            # Main Express server and API logic
├── public/              # Static files for the web interface
│   ├── index.html       # Main HTML page
│   ├── style.css        # CSS styling
│   └── script.js        # Frontend JavaScript
└── README.md            # This file
```

## Installation & Setup

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project files**
2. **Navigate to the project directory:**
   ```bash
   cd "MyFreeCodeCampWork/后端开发和 APIs/请求头解析器微服务"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **For development (with auto-restart):**
   ```bash
   npm run dev
   ```

### Running the Application

- **Server**: Runs on `http://localhost:3000` by default
- **API Endpoint**: `http://localhost:3000/api/whoami`
- **Web Interface**: `http://localhost:3000`

## Usage

### Via Web Interface

1. Open your browser and navigate to `http://localhost:3000`
2. Click the "Test API" button to see your request header information
3. View the formatted results and raw JSON response

### Via API Calls

#### Using cURL
```bash
curl http://localhost:3000/api/whoami
```

#### Using JavaScript Fetch
```javascript
fetch('/api/whoami')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Using Postman or similar tools
- Method: `GET`
- URL: `http://localhost:3000/api/whoami`

## Technical Implementation

### Backend (Node.js + Express)

- **Express.js**: Web framework for handling HTTP requests
- **CORS**: Cross-origin resource sharing support
- **Header Parsing**: Intelligent extraction of client information
- **IP Detection**: Handles various proxy scenarios and IPv6 addresses
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

### Frontend (HTML + CSS + JavaScript)

- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional appearance with gradients and shadows
- **Interactive Elements**: Real-time API testing with visual feedback
- **Error States**: Clear error messages and loading indicators

## FreeCodeCamp Requirements

This project fulfills all the required user stories:

✅ **A request to `/api/whoami` should return a JSON object with your IP address in the `ipaddress` key**

✅ **A request to `/api/whoami` should return a JSON object with your preferred language in the `language` key**

✅ **A request to `/api/whoami` should return a JSON object with your software in the `software` key**

## Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **cors**: Cross-origin resource sharing middleware

### Development Dependencies
- **nodemon**: Auto-restart server during development

## Environment Variables

- **PORT**: Server port (defaults to 3000 if not set)

## Deployment

This application can be deployed to various platforms:

- **Heroku**: Add a `Procfile` with `web: node server.js`
- **Railway**: Direct deployment from GitHub
- **Render**: Connect your repository and deploy
- **Vercel**: Serverless deployment option

## Contributing

This is a FreeCodeCamp certification project. Feel free to use it as a reference or starting point for your own projects.

## License

MIT License - feel free to use this code for educational purposes.

## Acknowledgments

- Built for FreeCodeCamp Backend Development and APIs certification
- Inspired by the original request header parser microservice
- Uses modern web technologies and best practices
