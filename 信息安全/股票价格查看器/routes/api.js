const express = require('express');
const axios = require('axios');
const Stock = require('../models/stock');

const router = express.Router();

// Helper function to get stock price from proxy API
async function getStockPrice(stockSymbol) {
  try {
    const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stockSymbol}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock price for ${stockSymbol}:`, error.message);
    throw new Error(`Unable to get stock price for ${stockSymbol}`);
  }
}

// GET /api/stock-prices
router.get('/stock-prices', async (req, res) => {
  try {
    const { stock, like } = req.query;
    
    if (!stock) {
      return res.status(400).json({ error: 'Stock parameter is required' });
    }

    // Handle single stock
    if (typeof stock === 'string') {
      const stockData = await getStockPrice(stock);
      
      if (stockData.error) {
        return res.status(400).json({ error: stockData.error });
      }

      let stockDoc = await Stock.findOrCreate(stock, stockData.latestPrice);
      
      // Handle like if requested
      if (like === 'true') {
        const ip = req.ip || req.connection.remoteAddress;
        stockDoc.addLike(ip);
      }
      
      await stockDoc.save();
      
      return res.json({
        stockData: {
          stock: stockDoc.stock,
          price: stockDoc.price,
          likes: stockDoc.likes
        }
      });
    }
    
    // Handle multiple stocks
    if (Array.isArray(stock) && stock.length === 2) {
      const [stock1, stock2] = stock;
      
      // Get prices for both stocks
      const [stock1Data, stock2Data] = await Promise.all([
        getStockPrice(stock1),
        getStockPrice(stock2)
      ]);
      
      if (stock1Data.error || stock2Data.error) {
        return res.status(400).json({ 
          error: stock1Data.error || stock2Data.error 
        });
      }
      
      // Find or create both stocks
      let stock1Doc = await Stock.findOrCreate(stock1, stock1Data.latestPrice);
      let stock2Doc = await Stock.findOrCreate(stock2, stock2Data.latestPrice);
      
      // Handle likes if requested
      if (like === 'true') {
        const ip = req.ip || req.connection.remoteAddress;
        stock1Doc.addLike(ip);
        stock2Doc.addLike(ip);
      }
      
      await Promise.all([stock1Doc.save(), stock2Doc.save()]);
      
      // Calculate relative likes
      const rel_likes1 = stock1Doc.likes - stock2Doc.likes;
      const rel_likes2 = stock2Doc.likes - stock1Doc.likes;
      
      return res.json({
        stockData: [
          {
            stock: stock1Doc.stock,
            price: stock1Doc.price,
            rel_likes: rel_likes1
          },
          {
            stock: stock2Doc.stock,
            price: stock2Doc.price,
            rel_likes: rel_likes2
          }
        ]
      });
    }
    
    return res.status(400).json({ error: 'Invalid stock parameter' });
    
  } catch (error) {
    console.error('Error in stock-prices endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
