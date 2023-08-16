const { Pool } = require('pg');
const { conn } = require('../src/db.js');
require("dotenv").config();
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT
  } = process.env;

describe('Prueba de base de Datos',() => {

    const pool = new Pool({
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        database: 'countries',
    });

    beforeAll(async()=>{
        await pool.connect();
    })

    afterAll(async()=>{
        const client = await pool.connect();
        client.release();
    })

    test('La conexión se realiza sin errores', async () => {
        expect(client).toBeTruthy(); 
    });

    test('Debe retornar error si se sube un país sin información completa', ()=>{
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
      
    })
});