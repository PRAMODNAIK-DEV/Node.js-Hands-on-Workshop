
# 🟥 Day 3 – Security and PostgreSQL Integration

## 🔐 Authentication & Authorization in Node.js

![Authentication & Authorization in Node.js](./images/Authentication%20and%20Security.jpg)
### 🧩 What’s the Difference?
| Concept            | Meaning                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| **Authentication** | Verifying the identity of a user (e.g., login).                               |
| **Authorization**  | Determining what an authenticated user is allowed to do (e.g., admin rights). |

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

#### 2. **Environment Configuration (.env)**
```
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret_key
```

#### 3. **Database Table (PostgreSQL SQL)**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

#### 4. **DB Connection using pg**
```js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;
```

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
