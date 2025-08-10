# Deployment Guide

This guide will help you deploy the URL Shortener Microservice to various platforms.

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Web Interface: http://localhost:3000
   - API Base: http://localhost:3000/api

## Production Deployment

### Option 1: Traditional VPS/Server

1. **Upload your code** to your server
2. **Install Node.js** (version 14 or higher)
3. **Install dependencies:**
   ```bash
   npm install --production
   ```
4. **Set environment variables:**
   ```bash
   export PORT=3000
   export NODE_ENV=production
   ```
5. **Start the server:**
   ```bash
   npm start
   ```

### Option 2: Using PM2 (Recommended for Production)

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start the application:**
   ```bash
   pm2 start server.js --name "url-shortener"
   ```

3. **Set PM2 to start on boot:**
   ```bash
   pm2 startup
   pm2 save
   ```

4. **Monitor your application:**
   ```bash
   pm2 status
   pm2 logs url-shortener
   ```

### Option 3: Docker Deployment

1. **Create a Dockerfile:**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t url-shortener .
   docker run -p 3000:3000 url-shortener
   ```

### Option 4: Cloud Platforms

#### Heroku

1. **Create a Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Deploy:**
   ```bash
   git push heroku main
   ```

3. **Open the app:**
   ```bash
   heroku open
   ```

#### Railway

1. **Connect your GitHub repository**
2. **Railway will automatically detect Node.js and deploy**
3. **Set environment variables if needed**

#### Render

1. **Connect your GitHub repository**
2. **Set build command:** `npm install`
3. **Set start command:** `npm start`
4. **Deploy automatically**

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |

## Production Considerations

### Security
- ✅ CORS is enabled for cross-origin requests
- ✅ Input validation prevents malicious URLs
- ✅ DNS lookup validates URL existence

### Performance
- ⚠️ **Note:** This implementation uses in-memory storage
- 🔄 **Recommendation:** Use a database (MongoDB, PostgreSQL) for production
- 📊 **Monitoring:** Add logging and metrics

### Scaling
- 🔄 **Horizontal Scaling:** Use load balancer with multiple instances
- 🗄️ **Database:** Implement persistent storage
- 🔒 **Caching:** Add Redis for URL caching

## Database Integration (Optional)

For production use, consider adding a database:

```javascript
// Example with MongoDB
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: Number, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);
```

## Monitoring and Logging

Add logging for production:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## SSL/HTTPS

For production, always use HTTPS:

1. **Obtain SSL certificate** (Let's Encrypt is free)
2. **Configure reverse proxy** (nginx recommended)
3. **Redirect HTTP to HTTPS**

## Backup Strategy

- **Database backups** (if using database)
- **Code repository** (Git)
- **Environment configuration**
- **SSL certificates**

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Permission denied:**
   ```bash
   sudo chown -R $USER:$USER /path/to/app
   ```

3. **Node.js version issues:**
   ```bash
   node --version
   npm --version
   ```

### Logs

Check application logs:
```bash
# PM2
pm2 logs url-shortener

# Direct
npm start 2>&1 | tee app.log

# System logs
journalctl -u your-service-name
```

## Support

For issues or questions:
- Check the README.md file
- Review the code comments
- Test with the provided test.js file
- Check the FreeCodeCamp requirements
