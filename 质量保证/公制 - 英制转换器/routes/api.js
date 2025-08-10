const express = require('express');
const ConvertHandler = require('../controllers/convertHandler');

const router = express.Router();
const convertHandler = new ConvertHandler();

/**
 * GET /api/convert
 * Convert between metric and imperial units
 * Query parameter: input (e.g., "10L", "1/2kg", "3.5mi")
 */
router.get('/convert', (req, res) => {
  const { input } = req.query;
  
  if (!input) {
    return res.json({ error: "No input provided" });
  }
  
  const result = convertHandler.getString(input);
  
  if (result.error) {
    return res.json({ error: result.error });
  }
  
  res.json(result);
});

module.exports = router;
