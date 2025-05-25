
# PostgreSQL Integration with Node.js and Express

PostgreSQL is a powerful, open-source object-relational database system. Node.js can interact with PostgreSQL using libraries like `pg`, which is a PostgreSQL client for Node.js.

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- A basic understanding of JavaScript and Express

## Step-by-Step Guide

---

## 1. Installs express and pg external Modules

```bash
npm install express pg
```

**Explanation**: Initializes a new Node.js project and installs `express` and `pg` (the PostgreSQL client).

---

## 2. Set Up PostgreSQL

# Create a database and a table using the PostgreSQL CLI or any GUI tool like pgAdmin.

Creating Database and Table using pgAdmin

## Steps

1. Open **pgAdmin**.
2. From the left sidebar, click on **Servers**.
3. A **Connect to Server** window will open and ask for the root user password given during installation. Enter the password and click **OK**.
4. It will connect to the PostgreSQL Server.
5. In the left sidebar, you will see a default database named **postgres**.
6. Right-click on the default server name **PostgreSQL**, then select **Create** → **Database**.
7. A new window will open. Enter the name for your database, e.g., `testdb`, and click **OK**.
8. Right-click on your new database name (`testdb`), then select **Query Tool**. This will open a query window where you can write PostgreSQL queries.
9. Copy and paste the below **CREATE TABLE** query into the Query Tool window, select the query, and click the **Run** button from the top ribbon.


```sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

**Explanation**: This creates a database named `testdb` and a `users` table with `id`, `name`, and `email` columns.

---

## 3. Connect Node.js to PostgreSQL
This file sets up a connection pool to a PostgreSQL database using the pg (node-postgres) library in Node.js. It allows the application to interact with the database efficiently.


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

**Explanation**: 
 - `pg.Pool`: A `class` from pg that handles a `pool` of database connections, allowing multiple queries without reconnecting each time (better performance and scalability). Replace credentials with your PostgreSQL config.

**🛠 Configuration Parameters**

| Key      | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| user     | Your PostgreSQL username                                                  |
| host     | The database server location, typically 'localhost' for local development |
| database | The name of the PostgreSQL database you want to connect to (e.g., testdb) |
| password | The password for the specified PostgreSQL user                            |
| port     | Default PostgreSQL port is 5432                                           |

➡️ Note: You must replace 'your_pg_user' and 'your_password' with actual PostgreSQL credentials.


**🔁 What is a "Pool of Database Connections"?**
A connection pool is a managed collection of reusable connections to a database. Instead of creating a new connection every time you run a query (which is `slow` and resource-intensive), a pool keeps a set of connections open and hands them out when needed.
  - When you create a new Pool() from the pg library, it uses some default settings.
  - At most, 10 connections can be created and reused at any given time.
  - If all are busy and another query comes in, it waits until one is free (or times out).
  - You can customize the pool by using a key called `max` (max: 20)

Think of it like a shared taxi service:
  - Instead of everyone driving their own car (making their own DB connection),
  - A few cars (connections) are available to pick up people (queries) as needed.



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
