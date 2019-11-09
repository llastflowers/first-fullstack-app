require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
// import seed data:
const monsters = require('./monsters');
const alignments = require('./alignments');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();

        const savedAlignments = await Promise.all(
            alignments.map(async alignment => {
                const result = await client.query(`
                    INSERT INTO alignments (alignment)
                    VALUES ($1)
                    RETURNING *;
                `,
                [alignment]);
                return result.rows[0];
            })
        );
        
        await Promise.all(
            monsters.map(monster => {
                const alignmentArray = savedAlignments.find(row => {
                    return row.alignment === monster.alignment;
                });
                const alignId = alignmentArray.id;

                return client.query(`
                    INSERT INTO monsters (name, alignments_id, url, hp, islegendary)
                    VALUES ($1, $2, $3, $4, $5);
                `,
                [monster.name, alignId, monster.url, monster.hp, monster.isLegendary]);
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

} //end run function
//     try {
//         await client.connect();
    
//         // "Promise all" does a parallel execution of async tasks
//         await Promise.all(
//             // map every item in the array data
//             monsters.map(monster => {

//                 return client.query(`
//                     INSERT INTO monsters (name, alignment, url, hp, is_legendary)
//                     VALUES ($1, $2, $3, $4, $5);
//                 `,

//                 [monster.name, monster.alignment, monster.url, monster.hp, monster.isLegendary]);
                
//             })
//         );


    
//         console.log('seed data load complete');
//     }
//     catch (err) {
//         console.log(err);
//     }
//     finally {
//         client.end();
//     }
    
// 