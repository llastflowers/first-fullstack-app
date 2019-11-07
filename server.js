// Load Environment Variables from the .env file


// Application Dependencies
const express = require('express');
// (add cors, pg, and morgan...)

// Database Client
// (create and connect using DATABASE_URL)


// Application Setup
const app = express();
// (add middleware utils: logging, cors, static files from public)
// app.use(...)


// API Routes

// http method and path...


// Start the server
// (use PORT from .env!)
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});