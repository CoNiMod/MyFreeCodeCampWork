const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  board: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  delete_password: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  bumped_on: {
    type: Date,
    default: Date.now
  },
  reported: {
    type: Boolean,
    default: false
  },
  replies: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId
    },
    text: {
      type: String,
      required: true
    },
    delete_password: {
      type: String,
      required: true
    },
    created_on: {
      type: Date,
      default: Date.now
    },
    reported: {
      type: Boolean,
      default: false
    }
  }]
});

// 索引
threadSchema.index({ board: 1, bumped_on: -1 });

module.exports = mongoose.model('Thread', threadSchema);
