const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: [{
    type: String
  }],
  commentcount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update commentcount when comments are added/removed
bookSchema.pre('save', function(next) {
  this.commentcount = this.comments.length;
  next();
});

module.exports = mongoose.model('Book', bookSchema);
