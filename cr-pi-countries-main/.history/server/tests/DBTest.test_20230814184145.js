const { Pool } = require('pg');

describe('Postgres DB Connection', () => {
    it('should establish a successful pg db connection', async () => {
        const pool = new Pool({
            user: 'postgres',
            password: '1234',
            host: 'localhost',
            port: 5000,
            database: 'countries',
            idleTimeoutMillis: 0,
            connectionTimeoutMillis: 0,
        });

  
        // Attempt to connect to the database
        const client = await pool.connect();

        // Verify the connection
        expect(client).toBeTruthy();

        // Release the client
        client.release();
  });
});