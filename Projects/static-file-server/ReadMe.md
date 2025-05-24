
# Node.js Static File Server Project

This project demonstrates how to build a simple Node.js server that serves static files (HTML, CSS, JS) from the current directory.

## Problem Statement

Create a Node.js server that:
- Serves static files (HTML, CSS, JS) based on the request URL.
- Returns a 404 status code with a message if the requested file does not exist.

## Functional Requirements

1. The server should serve files based on the URL path.
2. It should support file types like `.html`, `.css`, and `.js`.
3. If the file is not found, it must return a 404 error with a proper message.

---

## Instructions to Build and Run

### Step 1: Prerequisites

Make sure Node.js is installed.
```bash
node -v
```

---

### Step 2: Project Setup

1. Create a new project directory and navigate into it:

```bash
mkdir static-file-server
cd static-file-server
```

2. Create some sample static files (HTML, CSS, JS) inside a:

```bash
echo "<!DOCTYPE html><html><head><title>Home</title><link rel='stylesheet' href='style.css'></head><body><h1>Welcome</h1><script src='app.js'></script></body></html>" > index.html
echo "body { background-color: lightblue; }" > style.css
echo "console.log('JS file loaded');" > app.js
```

3. Create a `server.js` file:

```bash
server.js
```

---

### Step 3: Write the Server Code

Open `server.js` and paste the following code:

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

### Step 4: Run the Server

```bash
node server.js
```

---

### Step 5: Test the Server

Visit the following URLs in your browser:

- http://localhost:3000/ → Serves `index.html`

- http://localhost:3000/style.css → Serves CSS file

- http://localhost:3000/app.js → Serves JS file

- http://localhost:3000/invalid.txt → Should return 404 Not Found

---

## Explanation

- `fs.readFile()` reads files asynchronously.

- `path.extname()` gets the file extension.

- `mimeTypes` maps file extensions to proper Content-Types.

- If the file is not found, `ENOENT` triggers a 404 error.

- Server listens on port 3000 indefinitely.

---

## Notes

- This basic file server doesn't use any external libraries.

- You can extend it by using frameworks like Express for more features.

