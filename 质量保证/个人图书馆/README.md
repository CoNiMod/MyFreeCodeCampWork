# Personal Library

A full-stack JavaScript application for managing a personal library, built with Node.js, Express, and MongoDB.

## Features

- Add books to your library
- View all books with comment counts
- Get detailed information about specific books
- Add comments to books
- Delete individual books
- Clear entire library

## API Endpoints

### POST /api/books
Add a new book to the library.
- **Body**: `{ "title": "Book Title" }`
- **Response**: `{ "_id": "book_id", "title": "Book Title" }`
- **Error**: `"missing required field title"` if title is not provided

### GET /api/books
Retrieve all books in the library.
- **Response**: Array of books with `title`, `_id`, and `commentcount` properties

### GET /api/books/{_id}
Retrieve a specific book by ID.
- **Response**: Book object with `title`, `_id`, and `comments` array
- **Error**: `"no book exists"` if book is not found

### POST /api/books/{_id}
Add a comment to a specific book.
- **Body**: `{ "comment": "Your comment" }`
- **Response**: Updated book object
- **Error**: `"missing required field comment"` if comment is not provided, or `"no book exists"` if book is not found

### DELETE /api/books/{_id}
Delete a specific book.
- **Response**: `"delete successful"`
- **Error**: `"no book exists"` if book is not found

### DELETE /api/books
Delete all books in the library.
- **Response**: `"complete delete successful"`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB connection string:
   ```
   DB=mongodb://your-connection-string
   NODE_ENV=test
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Mocha, Chai, Chai-HTTP
- **Middleware**: CORS, Body Parser

## Project Structure

```
├── models/
│   └── book.js          # Book data model
├── routes/
│   └── api.js           # API endpoints
├── tests/
│   └── 2_functional-tests.js  # Functional tests
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── server.js            # Main server file
└── README.md            # Project documentation
```

## Testing

The project includes comprehensive functional tests that verify:
- Book creation with and without required fields
- Book retrieval (all books and individual books)
- Comment addition with and without required fields
- Book deletion (individual and all books)
- Error handling for non-existent books

Run the tests with:
```bash
npm test
```

## License

MIT License
