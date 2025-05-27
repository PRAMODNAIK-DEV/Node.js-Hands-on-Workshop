
# Node.js HTTP Server Project

This project demonstrates how to create a simple HTTP server using Node.js from scratch. The server will handle basic routing and respond with appropriate messages or error codes.

## Problem Statement

Create a simple Node.js HTTP server that listens on port `3000`. The server should:

- Respond with **"Hello, World!"** when the root path `/` is requested.
- Respond with **"This is the About page."** when `/about` is requested.
- Respond with a `404` status code and **"Page not found"** message for any other paths.

## Functional Requirements

1. Use the built-in `http` module.
2. Set proper HTTP response headers (e.g., `Content-Type: text/plain`).
3. Server must run indefinitely until manually stopped.

---

## Instructions to Build and Run

### Step 1: Prerequisites
- Make sure Node.js is installed.
- You can download Node.js from: https://nodejs.org/

To verify installation:
```bash
node -v
```
This should display the specific version of `Node.js` you have installed, for example:
```bash
v22.11.0
```
---

### Step 2: Project Setup or Directly use the VS Code to Create the folder instead of using mkdir in Terminal
1. Create a new directory:
```bash
mkdir simple-node-server
cd simple-node-server
```

2. Create a file named `server.js`:
```bash
server.js
```

---

### Step 3: Write the Server Code
Open `server.js` and add the following code:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;

  // Set content type header
  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    res.statusCode = 200;
    res.end('Hello, World!');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end('This is the About page.');
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

// Server listens on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

---

### Step 4: Run the Server
Use Node.js to run the app:
```bash
node server.js
```

You should see:
```
Server is running at http://localhost:3000
```

---

### Step 5: Test the Server
Open your browser or use curl to test:

- Visit [http://localhost:3000/](http://localhost:3000/) → Response: `Hello, World!`
- Visit [http://localhost:3000/about](http://localhost:3000/about) → Response: `This is the About page.`
- Visit any other path (e.g., `/contact`) → Response: `Page not found` with `404` status

---

## Explanation

- **http.createServer()**: Creates a new HTTP server instance that listens to incoming requests.
- **req.url**: Used to determine which URL path is being accessed.
- **res.statusCode**: Sets the HTTP status code for the response.
- **res.setHeader('Content-Type', 'text/plain')**: Ensures the client interprets the response as plain text.
- **res.end()**: Sends the response body to the client and ends the request.
- **server.listen(3000)**: Tells the server to start listening for connections on port 3000.

---

**Stopping the Server**
To stop the server, press `Ctrl + C` in the terminal where it's running.

---

**Notes**
- No external packages are required.
- This is a beginner-friendly project to learn core Node.js concepts.
