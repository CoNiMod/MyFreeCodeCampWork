# Stock Price Checker - Quick Start Guide

Get up and running in 5 minutes!

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment
```bash
cp sample.env .env
# Edit .env and set NODE_ENV=test
```

### 3. Start MongoDB
```bash
# Windows: Start MongoDB service
# macOS/Linux: sudo systemctl start mongod
```

### 4. Run Application
```bash
npm start
```

### 5. Open Browser
- **App**: http://localhost:3000
- **Test**: http://localhost:3000/test.html

## 🧪 Run Tests
```bash
npm test
```

## 📱 Features
- ✅ Single stock lookup
- ✅ Stock comparison
- ✅ Like system (1 per IP)
- ✅ Privacy compliant
- ✅ Responsive design
- ✅ Security headers

## 🔧 API Usage

### Single Stock
```
GET /api/stock-prices?stock=AAPL
GET /api/stock-prices?stock=AAPL&like=true
```

### Two Stocks
```
GET /api/stock-prices?stock=AAPL&stock=GOOGL
GET /api/stock-prices?stock=AAPL&stock=GOOGL&like=true
```

## 🆘 Need Help?
- Check `SETUP.md` for detailed setup
- Check `README.md` for full documentation
- Run `npm test` to verify installation

## 🎯 FreeCodeCamp Requirements
- ✅ NODE_ENV=test
- ✅ All 5 functional tests
- ✅ Security features implemented
- ✅ IP address anonymization
- ✅ Content Security Policy
