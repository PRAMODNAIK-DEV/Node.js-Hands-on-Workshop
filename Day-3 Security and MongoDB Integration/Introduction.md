
# 🟥 Day 3 – Introduction to Authentication & Authorization in Node.js and MongoDB Integration

## 🔐 Authentication & Authorization in Node.js

![Authentication & Authorization in Node.js](./images/Authentication%20and%20Security.jpg)
### 🧩 What’s the Difference?
| Concept            | Meaning                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Authentication** | Verifying the identity of a user (e.g., login `user_name` and `password`). to determine whether the user is legitimate or not. |
| **Authorization**  | Determining what an authenticated user is `allowed to do` (e.g., admin rights).                                                |

---

### ✅ Common Authentication Methods
- Username & Password (with hashing)
- OAuth (Google, GitHub login)
- JWT (JSON Web Token)
- Sessions & Cookies (for stateful auth)

---

### 🔧 Implementing Auth in Node.js (with PostgreSQL + JWT)

#### 1. **Setup**
Install required packages:
```bash
npm install express pg bcryptjs jsonwebtoken dotenv
```
  - `express` – Web framework for building APIs and server-side applications in Node.js.
  - `pg` – PostgreSQL client for Node.js to interact with PostgreSQL databases.
  - `bcryptjs` – Library for `hashing` and `comparing` passwords securely.
  - `jsonwebtoken` – For generating and verifying `JWT tokens` used in authentication.
  - `dotenv` – Loads environment variables from a `.env` file into process.env.

#### 2. **Environment Configuration (.env)**
First, create a new file named `.env` in the root folder of the project, then paste the following environment variables into it.

```js
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret_key
```

#### 3. **Database Table (PostgreSQL SQL)**
We have already created the users table in our PostgreSQL database. If not, please copy and paste the code below into the `Query Tool` of pgAdmin. Verify the table creation by running `SELECT * FROM users;`.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```

#### 4. **DB Connection using pg**
We have already created the database connection in our `db.js` file. If not, please create it by pasting the code below into `db.js` located in the root folder of the project.
```js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'Monday@123',
    port: 5432,
});

module.exports = pool;
```
## Significance of .env File in Development
The .env file is used to store environment-specific variables such as API keys, database URLs, ports, and secret tokens in a centralized and secure way. It helps developers:

  - **Separate configuration from code →**  Makes the application easier to manage and deploy across environments (development, staging, production).
  - **Secure sensitive data →** Prevents hardcoding secrets directly in the source code.
  - **Easily switch environments →** By changing the values in .env, the app can run differently without modifying any logic.
  - **Improve maintainability →**  All configs are in one place, making updates or debugging simpler.

The .env file is typically loaded using libraries like `dotenv`, and it should always be added to `.gitignore `to avoid pushing secrets to version control.

Let's replace our hardcoded database configurations with environment variables using the `.env `file and the dotenv package.
We have already created our `.env` file and installed the `dotenv` package. Now, access the environment variables from the .env file using the code below.

```js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;
```

```js
require('dotenv').config();
```
  - It loads environment variables defined in your `.env` file into process.env.
  - The require('dotenv') imports the dotenv package.
  - The .config() method reads the .env file and parses its key-value pairs.
  - These key-value pairs become available in your app via process.env.

**What is process.env in Node.js?**
process.env is a built-in object in Node.js that provides access to environment variables of the system where your application is running.

🔹 **How it works:**
  - `process` is a **`global object`** in Node.js that gives information and control over the current Node.js process.
  - env is a **`property`** of `process` that contains an object with all environment variables as key-value pairs.

#### 5. **Register Endpoint**
```js
const bcrypt = require('bcryptjs');
const pool = require('./db');

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, hashedPassword]
  );
  res.status(201).send('User registered');
});
```

#### 6. **Login & Token Generation**
```js
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});
```

#### 7. **Authorization Middleware**
```js
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).send('No token provided');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = decoded;
    next();
  });
};
```

#### 8. **Protected Route Example**
```js
app.get('/profile', authenticate, (req, res) => {
  res.send(`Hello user ${req.user.userId}`);
});
```

---

### 💡 Best Practices
- Always hash passwords (never store plain text)
- Use HTTPS in production
- Store tokens securely (HttpOnly cookies or secure storage)
- Implement token expiration and refresh mechanisms
