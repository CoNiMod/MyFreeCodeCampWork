const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// In-memory storage for URLs (in production, you'd use a database)
const urlDatabase = new Map();
let urlCounter = 1;

// Serve static files
app.use('/public', express.static(`${__dirname}/public`));

// Main route
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// API endpoint to create short URL
app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.json({ error: 'invalid url' });
  }

  try {
    // Parse the URL to validate format
    const parsedUrl = new URL(url);
    
    // Check if protocol is http or https
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.json({ error: 'invalid url' });
    }

    // Validate the hostname using DNS lookup
    dns.lookup(parsedUrl.hostname, (err, address) => {
      if (err) {
        return res.json({ error: 'invalid url' });
      }

      // Check if URL already exists in database
      for (const [shortUrl, originalUrl] of urlDatabase.entries()) {
        if (originalUrl === url) {
          return res.json({
            original_url: url,
            short_url: shortUrl
          });
        }
      }

      // Create new short URL
      const shortUrl = urlCounter++;
      urlDatabase.set(shortUrl, url);

      res.json({
        original_url: url,
        short_url: shortUrl
      });
    });

  } catch (error) {
    res.json({ error: 'invalid url' });
  }
});

// Redirect endpoint for short URLs
app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = parseInt(req.params.shortUrl);
  
  if (isNaN(shortUrl) || !urlDatabase.has(shortUrl)) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  const originalUrl = urlDatabase.get(shortUrl);
  res.redirect(originalUrl);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
