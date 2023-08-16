const { Pool } = require('pg');
const { conn } = require('../src/db.js');

describe('Prueba de base de Datos', () => {
    test('La conexión se realiza sin errores', async () => {
        const pool = new Pool({
            user: 'postgres',
            password: '1234',
            host: 'localhost',
            port: 5432,
            database: 'countries',
        });
        
        const client = await pool.connect();
     
        expect(client).toBeTruthy(); 
       
        client.release();
    });

    test('Debe retornar error si se sube un país sin información completa', async ()=>{
        const pool = new Pool({
            user: 'postgres',
            password: '1234',
            host: 'localhost',
            port: 5432,
            database: 'countries',
        });
       
        const client = await pool.connect();
        
        expect(client).toBeTruthy();
        await conn.sync({ force: true })

        expect(
            async()=>{
                try{
                    await client.query('BEGIN');
                    await client.query(`INSERT INTO "Countries" (id, name) VALUES ('KEN', 'Kenya') RETURNING *`);
                    await client.query('ROLLBACK');
                }
                catch(error){
                    throw(error)
                }
            }
        ).rejects.toThrow("null value in column \"offName\" of relation \"Countries\" violates not-null constraint")
      
        client.release();
    })
});