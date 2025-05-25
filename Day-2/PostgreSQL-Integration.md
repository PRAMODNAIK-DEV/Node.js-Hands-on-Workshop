
# PostgreSQL Integration with Node.js and Express

PostgreSQL is a powerful, open-source object-relational database system. Node.js can interact with PostgreSQL using libraries like `pg`, which is a PostgreSQL client for Node.js.

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- A basic understanding of JavaScript and Express

## Step-by-Step Guide

---

## 1. Initialize the Project

```bash
mkdir node-postgres-app
cd node-postgres-app
npm init -y
npm install express pg
```

**Explanation**: Initializes a new Node.js project and installs `express` and `pg` (the PostgreSQL client).

---

## 2. Set Up PostgreSQL

Create a database and a table using the PostgreSQL CLI or any GUI tool like pgAdmin.

```sql
CREATE DATABASE testdb;

\c testdb

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

**Explanation**: This creates a database named `testdb` and a `users` table with `id`, `name`, and `email` columns.

---

## 3. Connect Node.js to PostgreSQL

### `db.js` - Database Connection Setup

```js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'testdb',
    password: 'your_password',
    port: 5432,
});

module.exports = pool;
```

**Explanation**: This uses `pg.Pool` to manage connections. Replace credentials with your PostgreSQL config.

---

## 4. Create Express Server

### `server.js`

```js
const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// GET all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// POST a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

**Explanation**:
- `/users` (GET) retrieves all users.
- `/users` (POST) adds a new user to the database.
- `pool.query()` is used to run SQL queries.
- `express.json()` middleware parses incoming JSON requests.

---

## 5. Test the API

Use Postman or `curl` to test the endpoints.

### Example POST request

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john@example.com"}'
```

**Explanation**: Sends a POST request to insert a new user into the database.

---

## 6. Error Handling and Security (Optional but Recommended)

- Use try-catch for all database operations.
- Use parameterized queries to prevent SQL injection.
- Use environment variables for database credentials (`dotenv` package).

---

## Conclusion

You’ve now integrated PostgreSQL into a Node.js + Express application. With this setup, you can perform CRUD operations and build scalable backend APIs.

--- 
