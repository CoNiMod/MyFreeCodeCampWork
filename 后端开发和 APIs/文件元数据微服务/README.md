# File Metadata Microservice

A full-stack JavaScript application that handles file uploads and returns metadata about the uploaded files. Built with Express.js and Multer for the backend, and modern HTML/CSS/JavaScript for the frontend.

## Features

- **File Upload Interface**: Modern, responsive web interface for file uploads
- **Drag & Drop Support**: Intuitive drag and drop file upload functionality
- **File Metadata Extraction**: Returns file name, type, and size in bytes
- **Real-time Feedback**: Loading states and error handling
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Clean API endpoint for file analysis

## Requirements Implemented

✅ **Requirement #1**: Submit your own project, not the example URL
✅ **Requirement #2**: Submit a form that includes a file upload
✅ **Requirement #3**: Form file input field has the name attribute set to "upfile"
✅ **Requirement #4**: When you submit a file, you receive the file name, type, and size in bytes within the JSON response

## Technologies Used

- **Backend**: Node.js, Express.js
- **File Upload**: Multer middleware
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with gradients and animations
- **CORS**: Cross-origin resource sharing support

## API Endpoints

### POST /api/fileanalyse
Upload a file and get its metadata.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with file field named `upfile`

**Response:**
```json
{
  "name": "filename.ext",
  "type": "application/octet-stream",
  "size": 12345
}
```

## Installation & Setup

1. **Clone or download the project files**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **For development (with auto-restart):**
   ```bash
   npm run dev
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## File Structure

```
文件元数据微服务/
├── server.js              # Main server file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── public/                # Static files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styling
│   └── script.js          # Frontend JavaScript
└── .gitignore             # Git ignore file
```

## How to Use

1. **Open the application** in your web browser
2. **Select a file** by clicking the upload area or dragging and dropping
3. **Click "Upload File"** to submit the file
4. **View the metadata** displayed in the results section

## Key Features

### Backend (server.js)
- Express.js server setup with middleware
- Multer configuration for file uploads
- CORS support for cross-origin requests
- Error handling and validation
- Memory storage for uploaded files

### Frontend (public/)
- **HTML (index.html)**: Semantic markup with proper form structure
- **CSS (styles.css)**: Modern, responsive design with animations
- **JavaScript (script.js)**: Interactive functionality and API communication

### File Upload Features
- **Drag & Drop**: Intuitive file selection
- **File Validation**: Client-side file checking
- **Progress Feedback**: Loading states and error messages
- **Responsive UI**: Works on all device sizes

### API Features
- **RESTful Design**: Clean, predictable endpoints
- **Error Handling**: Proper HTTP status codes and error messages
- **File Size Limits**: 10MB maximum file size
- **Security**: Input validation and sanitization

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Available Scripts
- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-restart
- `npm test`: Run tests (placeholder)

### Environment Variables
- `PORT`: Server port (default: 3000)

## Customization

You can easily customize the application by:

- **Changing the port**: Modify the `PORT` environment variable
- **Adjusting file size limits**: Update the `fileSize` limit in `server.js`
- **Modifying the UI**: Edit the CSS and HTML files in the `public/` directory
- **Adding new metadata**: Extend the response object in the API endpoint

## Error Handling

The application includes comprehensive error handling:

- **File validation**: Checks for file presence and size
- **Upload errors**: Handles network and server errors
- **User feedback**: Clear error messages and loading states
- **Graceful degradation**: Fallbacks for unsupported features

## Security Considerations

- **File size limits**: Prevents large file uploads
- **Input validation**: Validates file types and names
- **CORS configuration**: Controls cross-origin access
- **Error sanitization**: Prevents information leakage

## License

This project is created for educational purposes as part of the FreeCodeCamp Backend Development and APIs certification.
