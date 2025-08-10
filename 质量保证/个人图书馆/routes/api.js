const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// POST /api/books - Add a book
router.post('/books', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.json('missing required field title');
    }
    
    const book = new Book({ title });
    await book.save();
    
    res.json({
      _id: book._id,
      title: book.title
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books - Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({}, 'title _id commentcount');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/{_id} - Get a single book
router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.json('no book exists');
    }
    
    res.json({
      _id: book._id,
      title: book.title,
      comments: book.comments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/books/{_id} - Add a comment to a book
router.post('/books/:id', async (req, res) => {
  try {
    const { comment } = req.body;
    
    if (!comment) {
      return res.json('missing required field comment');
    }
    
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.json('no book exists');
    }
    
    book.comments.push(comment);
    await book.save();
    
    res.json({
      _id: book._id,
      title: book.title,
      comments: book.comments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/books/{_id} - Delete a book
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.json('no book exists');
    }
    
    res.json('delete successful');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/books - Delete all books
router.delete('/books', async (req, res) => {
  try {
    await Book.deleteMany({});
    res.json('complete delete successful');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
