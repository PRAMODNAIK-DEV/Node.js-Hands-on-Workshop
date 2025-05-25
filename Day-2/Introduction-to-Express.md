
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
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web applications and APIs. It simplifies server-side development by handling `routing`, `middleware`, and `HTTP` `request`/`response` management efficiently.


### 🧱 Why Install Express?
- Node.js comes with a built-in `http` or `https` module to create servers, but it's low-level. You have to handle:
- Routing manually (req.url and req.method)
- Parsing request bodies
- Setting response headers
- Error handling, etc.

That can become tedious and repetitive.

### Advantages of Express over default `http`/`https` module?
Express is a popular framework built on top of Node's `http` module. It simplifies backend development.
- `Lightweight & Fast`: Minimal setup and optimized performance.
- `Middleware Support`: Easily integrate third-party middleware for functionalities like authentication, logging, and error handling.
- `Routing System`: Provides a robust and easy-to-use routing mechanism.
- `Scalability`: Suitable for both small-scale and enterprise-level applications.
- `Template Engines`: Supports various templating engines like EJS, Pug, and Handlebars.


### Installing Express
```bash
npm init -y
npm install express
```

#### Why do we need to Install Express:
Express is a third-party package
- It is not part of Node.js core.
- It's developed and maintained outside the official Node.js runtime by the open-source community.
- You get it via npm (Node Package Manager), which is the standard way to install third-party libraries in Node.js.

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
