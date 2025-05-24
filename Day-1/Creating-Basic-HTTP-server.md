# Creating a Basic HTTP Server in Node.js

## 📦 Step 1: Initialize the Node.js Project

Before writing any code, initialize your Node.js project using `npm`.

```bash
mkdir simple-node-server
cd simple-node-server
npm init
```

This creates a `package.json` file, which is useful for:
- Tracking dependencies
- Managing scripts
- Organizing project metadata

---

## 📝 Step 2: Create the Server File

Create a file named `server.js`:

```bash
touch server.js
```

---

## 🧑‍💻 Step 3: Write the HTTP Server Code

Paste the following code into `server.js`:

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200; // OK
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js Server!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

---

## ▶️ Step 4: Run the Server

Use the following command to run your server:

```bash
node server.js
```

Visit `http://localhost:3000` in your browser. You should see:

```
Hello, Node.js Server!
```

---

## 🧠 Explanation

- `http.createServer()`: Creates an HTTP server instance.
- `req`: Incoming HTTP request object.
- `res`: HTTP response object.
- `res.statusCode = 200`: Sets HTTP status to OK.
- `res.setHeader(...)`: Sets response headers (e.g., `Content-Type`).
- `res.end(...)`: Sends the response and ends the request.

---

## 🧪 Try It Out

Modify the response text in `res.end()` to test changes:

```js
res.end('Welcome to my Node.js Workshop!');
```

---
