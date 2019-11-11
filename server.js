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
app.use(express.json());


// API Routes

app.get('/api/monsters', async(req, res) => {

    try {
        const result = await client.query(`
        SELECT
            m.id, m.name, m.url, m.hp, 
            m.is_legendary as "isLegendary",
            a.*
        FROM monsters m
        JOIN alignments a
        ON   m.alignments_id = a.id
        ORDER BY m.hp;
        `);
        

        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.get('/api/monsters/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const result = await client.query(`
            SELECT
                m.id, m.name, m.url, m.hp, 
                m.is_legendary as "isLegendary",
                a.id as "alignmentId", a.alignment
            FROM monsters m
            JOIN alignments a
            ON   m.alignments_Id = a.id
            WHERE m.id = $1;
    `,
        [id]);

        const monster = result.rows[0];
        if (!monster) {
            res.status(404).json({
                error: `Monster id ${id} does not exist`
            });
        }
        else {
            res.json(result.rows[0]);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.post('/api/monsters', async(req, res) => {
    const monster = req.body;

    try {
        const result = await client.query(`
        INSERT INTO monsters (name, url, hp, is_legendary, alignments_Id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [monster.name, monster.url, monster.hp, monster.isLegendary, monster.alignmentId]
        );

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('/api/alignments', async(req, res) => {
    try {
        const result = await client.query(`
            SELECT *
            FROM alignments
            ORDER by id;
        `);
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});


// http method and path...

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});

/* 
SELECT
                m.*,
                a.*
            FROM monsters m
            JOIN alignments a
            ON   m.alignments_id = a.id
            ORDER BY m.hp;
            */