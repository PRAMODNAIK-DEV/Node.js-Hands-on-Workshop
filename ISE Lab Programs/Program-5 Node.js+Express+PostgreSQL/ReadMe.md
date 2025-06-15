
# Express.js + PostgreSQL CRUD API Project

## 📘 Overview
This project is a RESTful API built with **Express.js** and **PostgreSQL** to manage users. It supports basic CRUD operations:

- Create User
- Read All Users
- Update User by ID
- Delete User by ID

---

## 🗃️ Step 1: PostgreSQL Table Creation

You have to create the following users `table` in your postgres database. Use pgAdmin to create a `databse` with name of your choice and inside of this database create the table named `users`. Run the following SQL command in your PostgreSQL client which is `pgAdmin`.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);
```

---

## 🏗️ Step 2: Project Setup

### 1. Initialize the project
```bash
mkdir express-postgres-crud
cd express-postgres-crud
npm init -y
```

### 2. Install dependencies
```bash
npm install express pg dotenv
```

### 3. Create project structure
```
express-postgres-crud/
├── server.js
├── db.js
```

---

## 🔗 Step 3: Database Connection (`db.js`)
Create a new file inside the `express-postgres-crud` project folder named `db.js` and place the below code in it.
```js
const { Pool } = require('pg');

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node-postgres-db',     // Your DB Name
  password: 'Monday@123',           // DB Password
  port: 5432,
});

module.exports = pool;
```

---

## 🚀 Step 4: Create `server.js`

Create a file named `server.js` and paste the following code:

```js
const express = require('express');
const pool = require('./db');       // Import the DB connection pool from db.js

const app = express();
const port = 3000;

app.use(express.json());

// Create User
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Update User
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

Replace `'your_db_user'`, `'your_db_name'`, and `'your_db_password'` with your actual PostgreSQL credentials.

---

## ✅ Step 6: Testing the API

### Test with Postman
To test the endpoint make use of PostMan API Client. To learn how to use PostMan follow this documentation: [Postman Documentation](../../Postman.md)
#### 1. Create User

`Method`: POST
`URL`: http://localhost:3000/api/users
`Body`: 
```js
{
    "name": "Pramod Naik",
    "email": "pramod@example.com"
}
```
`Response`: 
```js
{
    "id": 3,
    "name": "Pramod Naik",
    "email": "pramod@example.com"
}
```

#### 2. Get All Users
`Method`: GET
`URL`: http://localhost:3000/api/users
`Body`: Not needed as it is GET request
`Response`: Server returns list of all the users from the users table.

#### 3. Update User
`Method`: PUT
`URL`: http://localhost:3000/api/users/3        // Here /3 is the User id which I want to update
`Body`: Now I want update the name so my req body look like this
```js
{
    "name": "Pramod Vishnu Naik",
    "email": "pramod@example.com"
}
```
`Response`: 
```js
{
    "id": 3,
    "name": "Pramod Vishnu Naik",
    "email": "pramod@example.com"
}
```

#### 4. Delete User
`Method`: DELETE
`URL`: http://localhost:3000/api/users/3    	    // /3 is the ID of the user which I want to delete
`Body`: No Body needed
`Response`: 
```js
{
    "message": "User deleted successfully"
}
```

---