# URL Shortener Microservice

A full-stack JavaScript application that provides URL shortening functionality, built with Node.js, Express, and modern web technologies.

## Features

- ✅ **URL Validation**: Validates URL format and existence using DNS lookup
- ✅ **Short URL Generation**: Creates unique numeric short URLs
- ✅ **URL Redirection**: Redirects short URLs to original URLs
- ✅ **Duplicate Prevention**: Prevents duplicate URLs from being stored
- ✅ **Error Handling**: Gracefully handles invalid URLs and errors
- ✅ **Modern UI**: Beautiful, responsive web interface
- ✅ **API Endpoints**: RESTful API for programmatic access

## Live Demo

This project is functionally similar to: https://url-shortener-microservice.freecodecamp.rocks

## Project Structure

```
短网址微服务/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── views/
│   └── index.html        # Main HTML page
└── public/
    ├── style.css         # CSS styles
    └── script.js         # Frontend JavaScript
```

## Installation

1. **Clone or download** this project to your local machine
2. **Navigate** to the project directory:
   ```bash
   cd 短网址微服务
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`

## API Usage

### Create Short URL

**Endpoint:** `POST /api/shorturl`

**Request Body:**
```json
{
  "url": "https://www.example.com"
}
```

**Success Response:**
```json
{
  "original_url": "https://www.example.com",
  "short_url": 1
}
```

**Error Response:**
```json
{
  "error": "invalid url"
}
```

### Redirect to Original URL

**Endpoint:** `GET /api/shorturl/:shortUrl`

**Example:** `GET /api/shorturl/1`

**Result:** Redirects to the original URL

## Testing Examples

### Using cURL

```bash
# Create a short URL
curl -X POST http://localhost:3000/api/shorturl \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.freecodecamp.org"}'

# Test redirection
curl -I http://localhost:3000/api/shorturl/1
```

### Using JavaScript Fetch

```javascript
// Create short URL
const response = await fetch('/api/shorturl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://www.example.com' })
});

const data = await response.json();
console.log(data.short_url); // The short URL number
```

## URL Validation Rules

The service validates URLs according to these criteria:

1. **Format**: Must be a valid URL with `http://` or `https://` protocol
2. **Existence**: Hostname must resolve to a valid IP address
3. **Structure**: Must follow standard URL format (e.g., `https://www.example.com`)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Middleware**: body-parser, CORS
- **Validation**: DNS lookup, URL parsing
- **Styling**: Modern CSS with gradients and animations

## Dependencies

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `body-parser`: Request body parsing middleware
- `nodemon`: Development server with auto-restart (dev dependency)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

To run the project in development mode:

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts when files change.

## Production Deployment

For production deployment:

1. Set the `PORT` environment variable if needed
2. Use `npm start` to run the production server
3. Consider using a process manager like PM2
4. Add a reverse proxy (nginx) for production use

## Contributing

This is a FreeCodeCamp project. Feel free to:

- Report bugs
- Suggest improvements
- Submit pull requests
- Fork and modify for your own projects

## License

MIT License - feel free to use this code for your own projects.

## FreeCodeCamp Requirements

This project fulfills all FreeCodeCamp requirements:

1. ✅ **Submit your own project** - This is a complete, working URL shortener
2. ✅ **POST to `/api/shorturl`** - Returns JSON with `original_url` and `short_url`
3. ✅ **GET `/api/shorturl/<short_url>`** - Redirects to original URL
4. ✅ **Invalid URL handling** - Returns `{ error: 'invalid url' }` for invalid URLs
5. ✅ **Body parsing middleware** - Uses `body-parser` for POST requests
6. ✅ **DNS validation** - Uses `dns.lookup()` to verify submitted URLs

## Screenshots

The application features a modern, responsive design with:
- Clean, gradient background
- Card-based layout
- Interactive form elements
- Real-time validation feedback
- Mobile-responsive design
