const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Main endpoint: /api/whoami
app.get('/api/whoami', (req, res) => {
  try {
    // Get IP address (handles various proxy scenarios)
    let ipaddress = req.ip || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   req.connection.socket?.remoteAddress ||
                   '127.0.0.1';
    
    // Clean up IP address (remove IPv6 prefix if present)
    if (ipaddress.startsWith('::ffff:')) {
      ipaddress = ipaddress.substring(7);
    }
    
    // Get preferred language from Accept-Language header
    const language = req.headers['accept-language'] || 'en-US,en;q=0.9';
    
    // Get software/browser information from User-Agent header
    const software = req.headers['user-agent'] || 'Unknown';
    
    // Return JSON response
    res.json({
      ipaddress: ipaddress,
      language: language,
      software: software
    });
  } catch (error) {
    console.error('Error parsing headers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root endpoint with basic info
app.get('/', (req, res) => {
  res.send(`
    <h1>Request Header Parser Microservice</h1>
    <p>This is a microservice that parses request headers and returns client information.</p>
    <h2>Usage:</h2>
    <p>Make a GET request to <code>/api/whoami</code> to get your IP address, preferred language, and software information.</p>
    <h2>Example:</h2>
    <p><code>GET /api/whoami</code></p>
    <h2>Response:</h2>
    <pre>{
  "ipaddress": "127.0.0.1",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0..."
}</pre>
    <p><a href="/api/whoami">Try it now!</a></p>
  `);
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Request Header Parser Microservice running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the service`);
  console.log(`API endpoint: http://localhost:${PORT}/api/whoami`);
});

module.exports = app;
