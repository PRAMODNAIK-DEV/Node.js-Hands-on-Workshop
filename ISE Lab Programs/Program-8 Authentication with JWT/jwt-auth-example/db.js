const { Pool } = require('pg');

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Test',     // Your DB Name
  password: 'Monday@123',           // DB Password
  port: 5432,
});

module.exports = pool;