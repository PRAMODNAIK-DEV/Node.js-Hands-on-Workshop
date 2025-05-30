
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

### 1. **Setup**
Install required packages:
```bash
npm install express pg bcryptjs jsonwebtoken dotenv
```
  - `express` – Web framework for building APIs and server-side applications in Node.js.
  - `pg` – PostgreSQL client for Node.js to interact with PostgreSQL databases.
  - `bcryptjs` – Library for `hashing` and `comparing` passwords securely.
  - `jsonwebtoken` – For generating and verifying `JWT tokens` used in authentication.
  - `dotenv` – Loads environment variables from a `.env` file into process.env.

---
### 2. **Environment Configuration (.env)**
First, create a new file named `.env` in the root folder of the project, then paste the following environment variables into it.

```js
DATABASE_URL=postgresql://username:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret_key
```
---

### 3. **Database Table (PostgreSQL SQL)**
We have already created the users table in our PostgreSQL database. If not, please copy and paste the code below into the `Query Tool` of pgAdmin. Verify the table creation by running `SELECT * FROM users;`.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```
---

### 4. **DB Connection using `pg`**
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
---

### Significance of `.env` File in Development
The `.env` file is used to store environment-specific variables such as `API keys`, `database URLs`, `ports`, and `secret` tokens in a centralized and secure way. 
It helps developers:

  - **Separate configuration from code →**  Makes the application easier to manage and deploy across environments (development, staging, production).
  - **Secure sensitive data →** Prevents hardcoding secrets directly in the source code.
  - **Easily switch environments →** By changing the values in .env, the app can run differently without modifying any logic.
  - **Improve maintainability →**  All configs are in one place, making updates or debugging simpler.

The file is typically loaded using libraries like `dotenv`, and it should always be added to `.gitignore `to avoid pushing secrets to version control.

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

**What is process.env in Node.js?**:

process.env is a built-in object in Node.js that provides access to environment variables of the system where your application is running.

🔹 **How it works:**
  - `process` is a **`global object`** in Node.js that gives information and control over the current Node.js process.
  - env is a **`property`** of `process` that contains an object with all environment variables as key-value pairs.

---

### 5. **Register/Create User Endpoint**
We have already created a /users endpoint in our app, which handles user registration. It is a POST request where the user is expected to send their name, email, and password. However, we haven't encrypted the user's password before storing it in the database, which poses a major security risk—anyone with database access could potentially steal user passwords. To address this issue and secure user data, follow the steps below.

Let's modify our POST `/users` endpoint (also known as Create or Register New User) inside /routes/users.js file to encrypt the user's password before storing it in the database. Just look at the commented lines and make the changes.

First, install the external package named bcryptjs to hash the password before storing it into the database table.
```js
npm install bcryptjs
```

Your modified code should look like this:

```js
const bcrypt = require('bcryptjs');     // Import the bcryptjs

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);     // Hash the Password

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]       // Change the normal password variable with hashedPassword variable
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});
```
**Explaination**
  - `const hashedPassword = await bcrypt.hash(password, 10);`:  Generates a hash of the password using 10 salt rounds. `10` → The salt rounds, a measure of how computationally intensive the hash will be.

**🔑 What is “salt” in password hashing?**
Salt is a `random value` added to the password before `hashing`. In our case, It tells bcrypt to repeat the `hashing algorithm` 2^10 = 1024 times.

This means:
  - Even if two users have the same password, their hashed values will be different.
  - Salting makes attacks like rainbow tables (precomputed hash dictionaries) useless.
  - Salt rounds = the number of times bcrypt processes the data internally.

🔒 Is this readable string insecure?
No — although it looks like a readable string, it's `not reversible`.

✅ Bcrypt hashes are one-way functions:
  - You cannot decrypt or reverse them to get the original password.
  - You can only compare: try hashing the user’s login attempt and see if it matches.


### 6. **Login & Token Generation**
**What is Login & Token Generation?**
It’s the process where:
  - A user logs in with credentials (e.g., email and password).
  - The server validates the credentials.
  - If valid, the server generates a token (usually a JWT – JSON Web Token).
  - The token is sent back to the client and used for authenticated requests.

**🔒 Why is this process needed?**
🔑 1. To verify the user’s identity:
  - You need to make sure the user is who they claim to be.
  - This is done by checking their email + password against stored (hashed) values.

🪪 2. To enable access to protected routes
  - After login, the token acts like an ID card.
  - The client includes the token in headers (usually Authorization) in each request.
  - The server checks the token to allow/deny access to APIs like:
    - /profile
    - /orders
    - /products

🛡️ 3. To keep sessions stateless
  - With tokens, the server doesn’t need to store session data.
  - Instead, each request carries the token and proves the user is authenticated.


**Why a token is needed even after login:**
🔐 Security: We don't ask for username & password on every request
  - Imagine a user logs in, then clicks around your app — view profile, check orders, post comments.
  - If you asked for username + password on every API call, that would:
    - Be annoying for the user
    - Be a huge security risk (password sent repeatedly = easier to steal)

🔄 Instead:
  - Ask for username + password once
  - Then issue a token (JWT or session token)
  - User sends token with each future request

## Username and password are for **`Authentication`**, and the token is for **`Authorization`**:

**Authentication** — `Username` + `Password`
  - This happens first
  - You prove you are who you say you are
  - Example:
    - "I’m john@example.com and my password is abc123"
    - Server checks DB, confirms identity
  - If valid, server gives you a token

**🪪 Authorization** — `Token`
  - This happens after authentication
  - Now that the server knows who you are, it checks:
    - "Are you allowed to access this route?"
    - "Are you an admin?"
    - "Can you edit this data?"
  - The token contains that information (like your userId, role, etc.)


**Let's add authentication and authorization to our app**
First, add a new endpoint **POST** **`/login`** for registered users to log in to our application. Inside the routes folder, create a new file named `login.js` and add the code below.

First, install the external package named jsonwebtoken to create a token after a user logs in.
```js
npm install jsonwebtoken
```

```js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');        // For creating JSON Web Tokens for authorization
const bcrypt = require('bcryptjs');         // For securely comparing the hashed password.
require('dotenv').config();                 // Loads environment variables from .env (like your JWT_SECRET).

router.post('/', async (req, res) => {
  const { email, password } = req.body;     // Extract email and password from the request body
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);     //Query the database for the user
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {      //Validate the user and compare passwords
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;
```
**Here**

```js
if (!user || !(await bcrypt.compare(password, user.password))) {
  return res.status(401).send('Invalid credentials');
}
```
This block of code will Authenticates the user and compare passwords
It Checks if:
  - User does not exist
  - OR bcrypt.compare() returns false (meaning password doesn’t match the hashed one in the DB)
  - If either condition is true → login fails → returns 401 Unauthorized.

**Generate a JWT token if login is successful**
```js
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
```
This line is responsible for generating a JSON Web Token (JWT) that is returned to the user after successful login. 
**`🔐 jwt.sign(payload, secretOrPrivateKey, options)`:**
This is a `function` provided by the jsonwebtoken library. It creates (`signs`) a token that the server can later verify.
  1. **Payload**:
    - `{ userId: user.id }`: 
       - This is the data you want to include in the token.
       - In this case, you're embedding the authenticated user’s unique id.
       - This userId can be used later to identify the user in protected routes (e.g., by extracting it from the token).
       - You can add more fields like email, role, etc., but avoid putting sensitive data (like passwords) in the token.
  2. **Secret Key**:
    - `process.env.JWT_SECRET`:
      - This is the secret string used to sign the token.
      - Only the **server** (you) should know this key.
      - It’s stored in .env file like:
        ```js
        JWT_SECRET=mySuperSecretKey123!
        ```
      - It ensures that tokens can’t be `faked` or `tampered` with — if someone changes the token, signature verification will fail.
  
  3. **Options** :
    - `{ expiresIn: '1h' }`:
      - This tells the token to expire in 1 hour.
      - After that, the token is no longer valid and users will need to log in again.
      - Other formats for this option:
        - '2d' = 2 days
        - '10m' = 10 minutes
        - 60 * 60 = 3600 seconds = 1 hour

  4. **What is returned?**:
    - The result is a signed string, typically looking like this:
        ```js
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0ODQ2NDAwOCwiZXhwIjoxNzQ4NDY3NjA4fQ.Xp3Y506oOkbAfdRnf-bLb15mrJfLfXIA4uGlvmv63gE
        ```
    - This string has 3 parts:
      - `Header`: specifies algorithm (HS256) and token type
      - `Payload`: includes your data (like userId)
      - `Signature`: verifies the token was signed with your secret


Now update the main file `server.js`, where all the `Controllers` from different files are imported and registered. Import and register the newly created `Controller` for the /login endpoint by appending the code below to `server.js`

```js
const loginRoutes = require('./routes/login');      // Import the login Controller


app.use('/login', loginRoutes);     // Register the controller under /login endpoint

```

### **Authorization Middleware**

**🔐 What is a Protected Route?**
A protected route is any `route` or `endpoint` in your web application that requires the user to be `authenticated` or `logged-in` — and possibly `authorized` (has permission) — before they can access it.


**🧱 Background & Reason**
When building modern web apps (with Node.js, Express, etc.), not every user should have access to all parts of the app.

For example:
✅ `/register` and `/login` → should be `public` (accessible to everyone)
🔒 `/dashboard`, `/profile`, `/admin/users` → should be `protected` (accessible only to logged-in users or users with special roles like admin)


**🚫 Problem Without Protection:**
If routes like /admin or /user/settings aren't protected:
  - Anyone can access them — even **without logging in**
  - Users can `modify` or `view` **sensitive data** without permission
  - The app becomes `insecure` and `vulnerable` to misuse


**🔐 Solution: Protected Routes**
To fix this, you need to:
   - Authenticate the user (using login + token like JWT)
   - Use **`Authorization Middleware`** to:
     - Check the token
     - Verify it
     - Extract user data from it
     - Allow access only if the token is valid


**Let’s secure our route by authorizing the user through a JWT token, ensuring that only authenticated users can access protected resources.**
Create a new folder named `middleware` inside the projects `folder`. Then, inside the `middleware` folder, create a file named `authMiddleware.js`, and paste the following code into it:

```js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).send('Authorization failed. Please provide a valid token');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('The provided Token is Invalid');
        req.user = decoded;
        next();
    });
};

module.exports = { authenticate };
```

**Explaination**
  1. `const authenticate = (req, res, next) => {` -> 
    - Defines a `middleware function` named authenticate.
    - Middleware functions in Express have access to the request (`req`), response (`res`), and `next()` callback.

  2. `const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>` ->
    - Attempts to extract the `token` from the `Authorization header` of the HTTP request.
    - `req.headers.authorization` typically looks like: `"Bearer eyJhbGciOiJIUz..."`.
    - The `.split(' ')[1]` splits it by space and retrieves the `token` part (the second part).
    - The `optional chaining` operator (?.) prevents runtime errors if authorization is undefined.

  3. `if (!token) return res.status(401).send('Authorization failed. Please provide a valid token');`->
    - If no token was found, it immediately returns a 401 Unauthorized response.
    - This tells the client they must provide a token.

  4. `jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {`->
    - Calls `jwt.verify()` to validate the token using the `secret key` from environment variables.
    - If valid, decoded will contain the **token's payload** (e.g., user info).
    - If invalid (e.g., tampered or expired), err will be set.

  5. `if (err) return res.status(403).send('The provided Token is Invalid');`->
    - If verification fails, sends a `403` Forbidden response.
    - Indicates that the **token is present but invalid** (not authorized).

  6. `next();`->
    - If everything checks out, it calls `next()` to pass control to the **next middleware** or **route handler**.

Now that we know how to send data to our backend server using `Postman` either by **Query Parameter**, **URL Parameter** or **request body**, let's see how to pass the Authorization Token (Bearer Token) either from `Postman` or from the client side.

1. **Passing Bearer Token using Postman**:
- **Step 1:** Open Postman and create a **new request** (or use an existing one).
- **Step 2:** Go to the `Authorization` tab.
- **Step 3:** In the Type dropdown, select `Bearer Token`.
- **Step 4:** In the Token field, paste your `JWT` or `Bearer` token (e.g., eyJhbGciOi...) which we generated from POST `/login` request.
- **Step 5:** Send the request. Postman will automatically include this token in the header as:
```js
Authorization: Bearer <your_token>
```

2. **Passing Bearer Token from Client Side (e.g., React/JavaScript)**

```js
fetch('https://localhost:3000/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

```

## Protect the Route:
Now to protect any route or endpoint we have to pass our `authenticate` middleware function as a parameter to the Controller or Route handling function (As a callback function).

**Example of Protectecting the GET /products Route**
```js
const { authenticate } = require('../middleware/authMiddleware');   // First import the middleware function

router.get('/', authenticate, async (req, res) => {           // Modify the Controller by passing authenticate as a callback function.
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
});
```

We can protect all routes or only those that are more sensitive or confidential.
---

