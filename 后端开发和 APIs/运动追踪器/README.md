# Exercise Tracker

A full-stack JavaScript application that tracks user exercises with a RESTful API, built for FreeCodeCamp's backend development certification.

## Features

- **User Management**: Create and manage users
- **Exercise Tracking**: Add exercises with description, duration, and date
- **Exercise Logs**: View complete exercise history with filtering options
- **RESTful API**: Clean, documented API endpoints
- **Modern UI**: Responsive design with intuitive user interface
- **Real-time Updates**: Dynamic content updates without page refresh

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Middleware**: CORS, body-parser
- **Environment**: dotenv for configuration

## Project Structure

```
运动追踪器/
├── public/
│   ├── index.html      # Main application interface
│   ├── styles.css      # Application styling
│   └── script.js       # Client-side JavaScript
├── server.js           # Express server and API endpoints
├── package.json        # Dependencies and scripts
├── .env               # Environment variables
└── README.md          # Project documentation
```

## API Endpoints

### 1. Create User
- **POST** `/api/users`
- **Body**: `{ "username": "string" }`
- **Response**: `{ "username": "string", "_id": "string" }`

### 2. Get All Users
- **GET** `/api/users`
- **Response**: Array of user objects with `username` and `_id`

### 3. Add Exercise
- **POST** `/api/users/:_id/exercises`
- **Body**: `{ "description": "string", "duration": number, "date": "string" (optional) }`
- **Response**: User object with exercise fields added

### 4. Get Exercise Log
- **GET** `/api/users/:_id/logs`
- **Query Parameters**:
  - `from`: Start date (yyyy-mm-dd)
  - `to`: End date (yyyy-mm-dd)
  - `limit`: Maximum number of logs to return
- **Response**: User object with exercise log array

## Data Models

### User
```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### Exercise
```json
{
  "username": "fcc_test",
  "description": "test",
  "duration": 60,
  "date": "Mon Jan 01 1990",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### Log
```json
{
  "username": "fcc_test",
  "count": 1,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [{
    "description": "test",
    "duration": 60,
    "date": "Mon Jan 01 1990"
  }]
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd 运动追踪器
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment configuration
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/exercise-tracker
PORT=3000
```

### 4. Start the application
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Creating a User
1. Enter a username in the "User Management" section
2. Click "Create User"
3. Copy the generated User ID for future use

### Adding Exercises
1. Enter the User ID from step 1
2. Provide exercise description and duration
3. Optionally select a date (defaults to current date)
4. Click "Add Exercise"

### Viewing Exercise Logs
1. Enter a User ID
2. Optionally set date range and limit
3. Click "Get Exercise Log"
4. View the complete exercise history

## Testing the API

You can test the API endpoints using tools like:
- **Postman**
- **cURL**
- **Browser Developer Tools**
- **Built-in API Testing section**

### Example cURL Commands

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser"}'

# Add an exercise
curl -X POST http://localhost:3000/api/users/USER_ID/exercises \
  -H "Content-Type: application/json" \
  -d '{"description":"Running","duration":30}'

# Get exercise log
curl http://localhost:3000/api/users/USER_ID/logs
```

## Features Implementation

### ✅ Required Features
- [x] POST `/api/users` - Create new user
- [x] GET `/api/users` - Get all users
- [x] POST `/api/users/:_id/exercises` - Add exercise to user
- [x] GET `/api/users/:_id/logs` - Get user exercise log
- [x] Date formatting using `toDateString()`
- [x] Query parameters support (from, to, limit)
- [x] Proper error handling
- [x] Data validation

### 🎨 Additional Features
- [x] Modern, responsive UI design
- [x] Real-time form validation
- [x] Dynamic content updates
- [x] User-friendly error messages
- [x] Loading states and feedback
- [x] Keyboard shortcuts support
- [x] Mobile-responsive design

## Error Handling

The application includes comprehensive error handling for:
- Invalid user IDs
- Missing required fields
- Database connection issues
- Network errors
- Validation errors

## Security Features

- Input validation and sanitization
- CORS configuration
- Environment variable protection
- MongoDB injection prevention

## Performance Optimizations

- Efficient database queries
- Pagination support via limit parameter
- Optimized frontend rendering
- Minimal DOM manipulation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- FreeCodeCamp for the project requirements
- Express.js team for the web framework
- MongoDB team for the database
- Open source community for inspiration

---

**Built with ❤️ for FreeCodeCamp's Backend Development Certification**
