const { Pool } = require('pg');

describe('Prueba de base de Datos', () => {
    test('La conexión se realiza sin errores', async () => {
        const pool = new Pool({
            user: 'postgres',
            password: '1234',
            host: 'localhost',
            port: 5432,
            database: 'countries',
        });
  
        // Attempt to connect to the database
        const client = await pool.connect();

        // Verify the connection
        expect(client).toBeTruthy();

        // Release the client
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
  
        // Attempt to connect to the database
        const client = await pool.connect();

        // Verify the connection
        expect(client).toBeTruthy();
        expect(
            async()=>{
                try{
                    await client.query('BEGIN');
                    await client.query('INSERT INTO Country VALUES ("KEN", "Kenya", ) RETURNING *');
                    await client.query('ROLLBACK');
                }
                catch(error){
                    throw(error)
                }
            }
        ).toThrow()

        // Release the client
        client.release();
    })
});