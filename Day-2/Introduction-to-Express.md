
# 🟨 Day 2 – Express.js & REST API Development

## Topics Covered
- Introduction to Express.js
- API Routing & Controllers
- Middleware (custom & third-party)
- Error handling, validation (express-validator)
- File upload using multer

---

## 🔶 Introduction to Express.js

### What is Express.js?
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Why use Express?
- Minimalistic and unopinionated
- Fast to set up and use
- Middleware support
- Great for building RESTful APIs

### Installing Express
```bash
npm init -y
npm install express
```

### Basic Express Server Example
```js
const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Key Concepts
- **Routing**: Define how the app responds to client requests.
- **Middleware**: Functions that execute during the request-response cycle.
- **Request & Response Objects**: Used to handle HTTP requests and responses.

### Features
- Easy to configure and customize
- Supports dynamic routing and templating engines
- Good integration with databases, file uploads, and more

---

To be continued: **API Routing & Controllers**
