require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const monsters = require('./monsters');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
    
        // "Promise all" does a parallel execution of async tasks
        await Promise.all(
            // map every item in the array data
            monsters.map(monster => {

                return client.query(`
                    INSERT INTO monsters (name, alignment, url, hp, is_legendary)
                    VALUES ($1, $2, $3, $4, $5);
                `,

                [monster.name, monster.alignment, monster.url, monster.hp, monster.isLegendary]);
                
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}