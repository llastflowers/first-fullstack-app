// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

// Database Client
// (create and connect using DATABASE_URL)
const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();



// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder


// API Routes

app.get('/api/monsters', async(req, res) => {

    try {
        const result = await client.query(`
            SELECT
                c.*,
                t.name as type
            FROM cats c
            JOIN types t
            ON   c.type_id = t.id
            ORDER BY c.year;
        `);
        
console.log(result.rows);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }

});

// http method and path...

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});