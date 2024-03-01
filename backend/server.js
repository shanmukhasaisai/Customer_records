const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Vignesh',
  password: 'Kamala@123',
  port: 5432, // Default PostgreSQL port
});
// Endpoint to fetch data
app.get('/api/customers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

