
# 🌐 Routing with Native Node.js

## What is Routing? (Concept Explanation)

| Routing is the mechanism to direct incoming HTTP requests to specific functions or code blocks based on the URL and method (GET, POST, PUT, PATCH and DELETE).

Routing allows your server to respond differently based on the **URL path** and **HTTP method** (GET, POST, PUT, PATCH and DELETE). Unlike Express.js, native Node.js requires manual routing using `req.url` and `req.method`.

---

### 🧠 How Native Routing Works

When a client sends a request to your server, Node.js provides:

- `req.url`: the path of the request (e.g., `/`, `/about`, `/contact`)
- `req.method`: the HTTP method (e.g., `GET`, `POST`, `DELETE`, `PUT`)

You use these values to determine which code should run for each route.

---

### ✅ Example: Basic Routing

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to the Home Page');
    } else if (url === '/about' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is the About Page');
    } else if (url === '/contact' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Contact us at: contact@example.com');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Page Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

### 🔍 Breakdown

| Route        | Method | Response                   |
|--------------|--------|----------------------------|
| `/`          | GET    | Welcome to the Home Page   |
| `/about`     | GET    | This is the About Page     |
| `/contact`   | GET    | Contact info               |
| (Any other)  | ANY    | 404 Page Not Found         |

---

### ✨ Why Learn Native Routing?

- Helps understand what Express and other frameworks do behind the scenes.
- Useful for small projects or APIs where minimal dependencies are preferred.
