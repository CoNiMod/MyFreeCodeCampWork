# Issue Tracker

A full stack JavaScript application for tracking issues across different projects. This project is part of the FreeCodeCamp Quality Assurance certification.

## Features

- Create, read, update, and delete issues
- Filter issues by various criteria (status, assignee, creator, etc.)
- Project-based organization
- Real-time updates
- Responsive design
- RESTful API

## API Endpoints

### POST /api/issues/{project}
Create a new issue for a specific project.

**Required fields:**
- `issue_title`
- `issue_text` 
- `created_by`

**Optional fields:**
- `assigned_to`
- `status_text`

**Response:** Returns the created issue object with all fields including `_id`, `created_on`, `updated_on`, and `open`.

### GET /api/issues/{project}
Retrieve all issues for a specific project.

**Query parameters (optional):**
- `open` - Filter by open/closed status (true/false)
- `created_by` - Filter by creator
- `assigned_to` - Filter by assignee
- `status_text` - Filter by status

**Response:** Returns an array of issue objects.

### PUT /api/issues/{project}
Update an existing issue.

**Required fields:**
- `_id` - The issue ID to update

**Optional fields:**
- `issue_title`
- `issue_text`
- `assigned_to`
- `status_text`
- `open`

**Response:** Returns success/error message with the issue ID.

### DELETE /api/issues/{project}
Delete an issue.

**Required fields:**
- `_id` - The issue ID to delete

**Response:** Returns success/error message with the issue ID.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd issue-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp sample.env .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/issue-tracker
```

5. Start MongoDB (if using local installation):
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

6. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## Testing

### Running Tests

1. Set the test environment:
```bash
# In your .env file
NODE_ENV=test
```

2. Run the tests:
```bash
npm test
```

### Test Coverage

The application includes 14 functional tests covering:

1. Create an issue with every field
2. Create an issue with only required fields
3. Create an issue with missing required fields
4. View issues for a project
5. Filter issues with one filter
6. Filter issues with multiple filters
7. Update one field in an issue
8. Update multiple fields in an issue
9. Update an issue without _id field
10. Update an issue without update fields
11. Update an issue with invalid _id
12. Delete an issue
13. Delete an issue with invalid _id
14. Delete an issue without _id field

## Project Structure

```
issue-tracker/
├── controllers/          # Business logic (if needed)
├── models/              # Database models
│   └── issue.js        # Issue schema
├── public/              # Static assets
│   ├── style.css       # Stylesheets
│   └── script.js       # Frontend JavaScript
├── routes/              # API routes
│   ├── api.js          # Main API endpoints
│   └── fcctesting.js   # FCC testing routes
├── tests/               # Test files
│   └── 2_functional-tests.js  # Functional tests
├── views/               # HTML templates
│   └── index.html      # Main page
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── server.js            # Main server file
└── test-runner.js       # Test execution
```

## Usage

### Creating Issues
1. Fill out the "Create New Issue" form
2. Enter a project name, issue title, description, and creator
3. Optionally add assignee and status information
4. Click "Create Issue"

### Searching Issues
1. Use the "Search Issues" form
2. Enter a project name
3. Apply filters as needed (open status, creator, assignee)
4. Click "Search Issues"

### Updating Issues
1. Search for issues in a project
2. Click "Edit" on any issue
3. Modify the desired fields
4. Click "Update Issue"

### Deleting Issues
1. Search for issues in a project
2. Click "Delete" on any issue
3. Confirm the deletion

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Testing:** Mocha, Chai, Chai-HTTP
- **Development:** Nodemon

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- FreeCodeCamp for the project requirements
- MongoDB for the database technology
- Express.js team for the web framework
