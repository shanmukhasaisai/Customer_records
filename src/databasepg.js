const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Vignesh',
  password: 'Kamala@123',
  port: 5432, // Default PostgreSQL port
});

pool.query('SELECT * FROM customers', (err, result) => {
  if (err) {
    console.error('Error executing query', err);
    return;
  }
  console.log('Data fetched successfully:', result.rows);
});
