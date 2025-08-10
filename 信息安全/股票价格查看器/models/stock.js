const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  stock: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  ips: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
stockSchema.index({ stock: 1 });

// Method to add a like from an IP address
stockSchema.methods.addLike = function(ip) {
  // Anonymize IP address for privacy compliance
  const anonymizedIP = this.anonymizeIP(ip);
  
  // Check if this IP has already liked this stock
  if (!this.ips.includes(anonymizedIP)) {
    this.likes += 1;
    this.ips.push(anonymizedIP);
    return true;
  }
  return false;
};

// Method to anonymize IP address
stockSchema.methods.anonymizeIP = function(ip) {
  // Simple anonymization: hash the IP address
  // This ensures privacy compliance while maintaining uniqueness
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
};

// Static method to find or create stock
stockSchema.statics.findOrCreate = async function(stockSymbol, price) {
  let stock = await this.findOne({ stock: stockSymbol });
  
  if (!stock) {
    stock = new this({
      stock: stockSymbol,
      price: price,
      likes: 0,
      ips: []
    });
  } else {
    stock.price = price;
  }
  
  return stock;
};

module.exports = mongoose.model('Stock', stockSchema);
