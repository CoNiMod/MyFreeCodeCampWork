# Stock Price Checker - Deployment Guide

This guide covers deploying the Stock Price Checker application to various platforms.

## Prerequisites

- Node.js application is working locally
- All tests are passing
- MongoDB database is accessible from deployment environment

## Environment Variables

Set these environment variables in your deployment platform:

```env
NODE_ENV=production
PORT=3000
DB=mongodb://your-mongodb-connection-string
```

## Deployment Options

### 1. Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB=your-mongodb-connection-string
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### 2. Railway

1. **Connect GitHub repository**
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

### 3. Render

1. **Connect GitHub repository**
2. **Set build command**: `npm install`
3. **Set start command**: `npm start`
4. **Set environment variables**

### 4. DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Select Node.js environment**
3. **Set environment variables**
4. **Deploy**

### 5. Vercel

1. **Connect GitHub repository**
2. **Set build command**: `npm install`
3. **Set output directory**: `public`
4. **Set environment variables**

## MongoDB Setup

### MongoDB Atlas (Recommended)

1. **Create cluster** at [mongodb.com](https://mongodb.com)
2. **Get connection string**
3. **Set network access** to allow your deployment IP
4. **Create database user** with read/write permissions

### Local MongoDB

- Ensure MongoDB is accessible from deployment environment
- Configure firewall rules appropriately

## Security Considerations

### Production Security

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit `.env` files
3. **Database**: Use strong passwords and restrict access
4. **CORS**: Configure CORS for your domain only

### Content Security Policy

The application includes CSP headers. Verify they work in production:

```javascript
// In server.js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  }
}));
```

## Testing After Deployment

1. **Run functional tests** against deployed API
2. **Test frontend functionality**
3. **Verify database connections**
4. **Check error handling**

## Monitoring

### Health Checks

Add a health check endpoint:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});
```

### Logging

Implement proper logging for production:

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

## Troubleshooting

### Common Deployment Issues

1. **Port binding errors**
   - Use `process.env.PORT` in server.js
   - Ensure port is available

2. **Database connection failures**
   - Verify connection string
   - Check network access
   - Verify database credentials

3. **Static file serving issues**
   - Check file paths
   - Verify static middleware configuration

4. **Environment variable issues**
   - Verify all required variables are set
   - Check variable names and values

### Debug Mode

Enable debug logging in production temporarily:

```bash
DEBUG=* npm start
```

## Performance Optimization

1. **Database indexing**
2. **Response caching**
3. **Static file compression**
4. **Load balancing** (if needed)

## Backup Strategy

1. **Database backups** (MongoDB Atlas provides automatic backups)
2. **Code repository** (GitHub)
3. **Environment configuration** (document all variables)

## Rollback Plan

1. **Keep previous deployment** ready
2. **Database migration scripts**
3. **Environment variable backups**

## Support

For deployment issues:
1. Check platform-specific logs
2. Verify environment configuration
3. Test locally with production settings
4. Review platform documentation
