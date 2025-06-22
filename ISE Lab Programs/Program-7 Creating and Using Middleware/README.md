
# 📦 Project: Express Middleware Logger

This Node.js application uses Express.js and demonstrates the use of **custom middleware** to log all incoming HTTP requests (method and URL) both to the **console** and a **log file** (`requests.log`).

---

## 🧠 What is Middleware?

Middleware functions are functions that have access to the **request object (req)**, the **response object (res)**, and the **next middleware function** in the application’s request-response cycle.

Middleware can:

- Execute any code
- Modify the request and response objects
- End the request-response cycle
- Call the next middleware in the stack

**In this project:** We use middleware to log details of incoming HTTP requests.

## [Please refer to this document for more information on middlewares in Node.js](../../Day-2%20Express.js%20&%20REST%20API%20Development//Middleware.md)
---

## ✅ Features

- Custom middleware logs every incoming request.
- Logs are saved to both console and a file (`requests.log`).
- Simple routes to test the logger.
- Easy to set up and run.

---

## 🛠️ Setup

```bash
mkdir express-middleware-logger
cd express-middleware-logger
npm init -y
```

---

## 🧾 File Structure

```
express-middleware-logger/
├── app.js
├── package.json
└── requests.log
```
---

## 📦 Dependencies

- express
- fs (File System - Node.js built-in module)

Install dependencies:

```bash
npm install express
```

---

## 📁 Main Code
Inside the project `express-middleware-logger` folder create the server file named `app.js` and add the following code.

```javascript
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Global Custom Middleware - Logs method and URL to console and file
// This middleware will be executed for all the client request as it is Global
app.use((req, res, next) => {
  const logEntry = `[${req.method}] ${req.url}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync('requests.log', logEntry);
  next();
});

// Route-specific Middleware (Local middleware as we have to pass this to specific route)
// To make it execute we have to pass it to specific route when user invokes that route then only this middleware will execute.
const checkAuth = (req, res, next) => {
  // Dummy authentication logic
  const isAuthenticated = true; // We will make use of this in Program 8: Authentication with JWT
  if (isAuthenticated) {
    console.log('Authenticated');
    next();
  } else {
    res.status(403).send('Not Authorized');
  }
};


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Home Page!');
});

// Here I am passing checkAuth middleware to /about route
app.get('/about', (req, res) => {
  res.send('This is the About Page');
});


// Here I am passing checkAuth middleware to /login route
app.post('/login', checkAuth, (req, res) => {
  res.send('Login Endpoint');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---
## 🚀 Running the Application

```bash
node app.js
```
---

## Testing the API

### Test with Postman
To test the endpoint make use of PostMan API Client. To learn how to use PostMan follow this documentation: [Postman Documentation](../../Postman.md)
### 1. Root / Endpoint

#### `Method`: GET
#### `URL`: http://localhost:3000/
#### `Body`: No Body needed
#### `Response`: 
```js
Welcome to Home Page!
```
#### `Output`: 
Please check the console and request.log file where you will see the logs from our Global Middleware : [GET] /


### 2. /about Endpoint

#### `Method`: GET

#### `URL`: http://localhost:3000/about

#### `Body`: No Body needed

#### `Response`: 
```js
This is the About Page
```
#### `Output`: 
Please check the console and request.log file where you will see the new log from our Global Middleware : [GET] /about as well as another console.log Authenticated from the named Middleware checkAuth which we attached to this /about endpoint. 


### 3. /about Endpoint

#### `Method`: POST
#### `URL`: http://localhost:3000/login
#### `Body`: No Body needed
#### `Response`: 
```js
Login Endpoint
```
#### `Output`: 
#### Please check the console and request.log file where you will see the new log from our Global Middleware : [POST] /login as well as another console.log Authenticated from the named Middleware checkAuth which we attached to this /login endpoint. 

