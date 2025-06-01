
# 🌐 Routing with Native Node.js

## What is Routing? (Concept Explanation)

| Routing is the mechanism to **direct incoming HTTP requests** to specific functions or code blocks based on the URL and method (`GET`, `POST`, `PUT`, `PATCH` and `DELETE`).

Routing allows your server to respond differently based on the **URL path** and **HTTP method** (GET, POST, PUT, PATCH and DELETE). Unlike Express.js, native Node.js requires **manual routing** using `req.url` and `req.method`. This is the main disadvantage of Native Routing using `http` module.

---

### 🧠 How Native Routing Works

When a client sends a request to your server, Node.js provides:

- `req.url`: the path of the request (e.g., `/`, `/about`, `/contact`)
- `req.method`: the HTTP method (e.g., `GET`, `POST`, `DELETE`, `PUT`, `PATCH`)

You use these values to determine which code should run for each route.

---

### Example: Basic Routing

First, create a file named `server.js`(if it doesn't already exist), and paste the code below into it.

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

### What is `req` and `res`?
### `req` → Request Object (IncomingMessage from Client)
  - Represents the incoming request from the client (browser, Postman, etc.).
  - Contains details about the request such as:

    | Property       | Description                                                |
    | -------------- | ---------------------------------------------------------- |
    | req.url        | The URL path requested (e.g., /file, /file/append)         |
    | req.method     | The HTTP method used (e.g., GET, POST, DELETE)             |
    | req.headers    | The request headers (e.g., content type, auth tokens)      |
    | req.on('data') | Used to receive streamed request body data (for POST, PUT) |
    | req.on('end')  | Called when the body has been fully received               |

#### 🧠 Think of req as the `question` the client is asking.


### `res` → Response Object (ServerResponse to the Client)
- Represents the outgoing response from your server to the client.
- Used to build and send your reply.

    | Method / Property    | Purpose                                                      |
    | -------------------- | ------------------------------------------------------------ |
    | res.statusCode = 200 | Sets the HTTP response status code                           |
    | res.setHeader(...)   | Sets response headers like Content-Type                      |
    | res.write(data)      | Writes data to the response body (not required if using end) |
    | res.end(data)        | Ends the response and sends the data back to the client      |

    
#### 🧠 Think of res as the `answer` your server gives to the client.

---

### 🔍 Example Output

| Route       | Method | Response                 |
| ----------- | ------ | ------------------------ |
| `/`         | GET    | Welcome to the Home Page |
| `/about`    | GET    | This is the About Page   |
| `/contact`  | GET    | Contact info             |
| (Any other) | ANY    | 404 Page Not Found       |

---

### ✨ Why Learn Native Routing?
- Helps understand what Express and other frameworks do behind the scenes.
- Useful for small projects or APIs where minimal dependencies are preferred.



## To be continued: [Simple-CLI-Based-Tools](Simple-CLI-Based-Tools.md)