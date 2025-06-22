
# 🔐 Problem 8: Authentication with JWT (Node.js + Express + PostgreSQL)

This project demonstrates a basic authentication system using **JSON Web Tokens (JWT)**, **PostgreSQL** for storing user credentials, and a simple HTML frontend.

---
## [For more details on Authentication and Authorization Please refer this Document:  Simple-CLI-Based-Tools](../../Day-3%20Security%20and%20MongoDB%20Integration/Introduction-to-Authentication-Authorization.md)

## Functional Requirements
1. **POST /login**: Authenticates user and returns a `JWT Token` on success.
2. **GET /profile**: A protected route accessible only with a valid JWT.
3. **HTML Interface**:
   - Login form for username and password.
   - Displays profile info upon successful login.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (`jsonwebtoken`)
- `pg` (PostgreSQL client)
- HTML + Vanilla JS frontend

---

## 📂 File Structure

```
jwt-auth-example/
├── server.js
├── index.html
├── package.json
└── README.md
```

---

### 1. 📦 Setup Instructions

```bash
mkdir jwt-auth-example
cd jwt-auth-example
npm init -y
```

### 2. Install Dependencies

```bash
npm install express jsonwebtoken pg body-parser
```

### 3. PostgreSQL Database Setup
Run the following SQL to create the user table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Insert a test user
INSERT INTO users (username, password) VALUES ('admin', 'admin123');
```

> 🔐 Passwords should be hashed in production using `bcrypt`.

---

## Database Connection:
Create a new file named db.js, where we will write the database configuration to connect to and perform operations with the PostgreSQL database.

```js
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
```


## 🧾 server.js
Create a new file named `server.js` and place the following code inside it. The main idea of `JWT` (JSON Web Token) is to provide `authorized` access to `authenticated` users via their `username` and `password`. This ensures that even after `authentication`, we can protect our `routes` or `endpoints`.

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require("./db");
const bodyParser = require('body-parser');
var cors = require('cors');             // This is to avoid CORS error from the frontend


const PORT = 3000;
const JWT_SECRET = "PRAMOD-Secret";

const app = express();

// Third Party Middlewares
app.use(cors());
app.use(bodyParser.json());         // This is to convert the data from fronend to JSON.

app.get('/', (req, res) => {
    res.send("I am Alive!");
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password]);
  if (result.rows.length > 0) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protect the /profile route/endpoint by adding authenticateToken middleware which takes the token as input and checks is it valid if yes then sends the res back to the client if false then no response as the user is not authorized to access this route.
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:3000`);
});
```

---

## 🚀 Run the Server

```bash
node server.js
```

---

## ✅ Step 6: Testing the API

### Test with Postman
To test the endpoint make use of PostMan API Client. To learn how to use PostMan follow this documentation: [Postman Documentation](../../Postman.md)
#### 1. Create User

`Method`: POST
`URL`: http://localhost:3000/login
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
`URL`: http://localhost:3000/users
`Body`: Not needed as it is GET request
`Response`: Server returns list of all the users from the users table.

---

## 🖥️ index.html
Once after testing the endpoint in Postman if it is working as expected then integrate it into the frontend using HTML and JavaScript.
Create the frontend using the HTML code below inside `index.html` file to send requests to the backend server endpoint.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JWT Login</title>
</head>
<body>
  <h2>Login</h2>
  <input type="text" id="username" placeholder="Username"><br>
  <input type="password" id="password" placeholder="Password"><br>
  <button onclick="login()">Login</button>
  <p id="message"></p>

  <script>
    let token = '';

    async function login() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.token) {
        token = data.token;
        document.getElementById('message').innerText = "Login successful!";
        getProfile();
      } else {
        document.getElementById('message').innerText = "Login failed!";
      }
    }

    async function getProfile() {
      const res = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      const data = await res.json();
      document.getElementById('message').innerText = data.message || "Access Denied!";
    }
  </script>
</body>
</html>
```

---

## 🌐 Access the Frontend

Open `index.html` in your browser and try logging in.

---

## 🧪 Test the API Endpoints using Frontend or Postman
#### `Method`: POST
#### `URL`: http://localhost:3000/login
#### `Body`: 
```js
{
    "username": "admin",
    "password": "admin123"
}
```
#### `Response`: 
```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUwNTk5MDAwLCJleHAiOjE3NTA2MDI2MDB9.C_m4_xumwk0BjK51LmKmPHJbCvz4KetKeNSzc6LXBsY"
}
```

#### 2. Get Profile Details
Now, the /profile is authorized so we have to pass the Token which we got from the server after login using /login in the Header of the /profile endpoint

#### `Method`: GET
#### `URL`: http://localhost:3000/profile
#### `Body`: Not needed as it is GET request
#### `Header`: 
In the Header section of the Postman and add new key: value as Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzUwNTk5MDAwLCJleHAiOjE3NTA2MDI2MDB9.C_m4_xumwk0BjK51LmKmPHJbCvz4KetKeNSzc6LXBsY 
[Please refer this](../../Postman.md)

#### `Response`: Server greets the user with name as 
```js
{
    "message": "Welcome admin!"
}
```

---

