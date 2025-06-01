
## 🖥️🛠️ 📄 Building a Native RESTful HTTP Server Using Node.js and the fs Module (No Express.js)

This backend server demonstrates how to use the built-in `http` and `fs` modules in Node.js to handle file operations through HTTP methods.

## Problem Statement

Create a Node.js server that:
- Performs the file operations like Read, Write, Append, Delete based on the request URL.
- Returns a 404 status code with a message if the requested file does not exist.

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

2. Create a `server.js` file:

```bash
server.js
```

3. Create a new folder named `Files`: This folder will contains our Files
```bash
mkdir Files
```

---
### Step 3: `Starter Code`: Create a basic server using `http` module
Open `server.js` and paste the following code:

#### 🛑 Root Route Handler

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;                         // Status Code OK
        res.setHeader('Content-Type', 'text/plain');    // Indicates the type of data sent to Client
        res.end('Welcome to File System Operations in Node.js! \nUse GET /file, POST /file, POST /file/append, or DELETE /file');              // End the Response with Hello, Node.js Server!
    }
  });

server.listen(port, hostname, () => {             // START the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Step 4: Create the Routes/Enpoints using `http` module

#### 📥 POST `/file` – Create or Overwrite File
This endpoint or route writes the provided content into `Files/example.txt`. If the file does not exist, it will be created.

Place the below code inside the `server.js` file, within the callback function of `http.createServer`.

```js
if (req.method === 'POST' && req.url === '/file') {
    let body = '';

    // 1. Collect the data chunks
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // 2. When all data is received
    req.on('end', () => {
        console.log("Body", body);
        const parsedBody = JSON.parse(body);
        fs.writeFile('Files/example.txt', parsedBody.content, (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error writing file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: "File written successfully", data: parsedBody.content }));
        });
    });

}
```

### Test the Endpoint in Postman: Sample Request:
- **Method:** `POST`
- **Endpoint:** `/file`
- **Body (JSON):**

```json
{
  "content": "This is the new file content."
}
```

### Why do we use req.on() in this code?
In Node.js, incoming request data (req) is a readable stream. When a client sends data in the body of a POST request (like JSON), it doesn't arrive all at once — it comes in chunks.

To handle this streamed data, we use:
```js
req.on('data', chunk => { ... });
req.on('end', () => { ... });

```
1. `req.on('data', chunk => { ... })`:
     - Listens for the **'data'** `event`.
     - Called every time a **new chunk of data arrives**.
     - We keep appending each chunk to a variable (body += chunk.toString()), so we can combine all the chunks into the full request body.

2. `req.on('end', () => { ... })`
     - Called when **all chunks have been received**.
     - This is where we safely parse the complete request body (usually JSON).
     - After parsing, you can process the data — like appending it to a file here.

### Note:
> In **vanilla Node.js http module**, there is no built-in middleware like in Express to parse JSON — you have to handle it manually using streams (req.on('data'), req.on('end')) or create Ccstom **`JSON Parsing Middleware`**.
---

## 📤 GET `/file` – Read File Content

Reads the contents of `Files/example.txt` and sends it in the response.

### 🛠 Code Snippet:
Insert the below code into `server.js`.

```js
if (req.method === 'GET' && req.url === '/file') {
    fs.readFile('Files/example.txt', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error reading file (May be the file is not Exists)');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
    });

}
```

### Test the Endpoint in `Postman`: Sample Request:
- **Method:** `GET`
- **Endpoint:** `/file`

---

## ➕ POST `/file/append` – Append to File
Appends the provided content to the existing file.

### 🛠 Code Snippet:
```js
if (req.url === '/file/append' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            fs.appendFile('Files/example.txt', `\n${parsedBody.content}`, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error appending to file');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Content appended successfully', data: parsedBody.content }));
            });
        } catch (e) {
            res.statusCode = 400;
            res.end('Invalid JSON');
        }
    });

}
```

### Test the Endpoint in `Postman`: Sample Request:
- **Method:** `POST`
- **Endpoint:** `/file/append`
- **Body (JSON):**
```json
{
  "content": "This is content to append."
}
```
---
## ❌ DELETE `/file` – Delete File

### 📌 Description:
Deletes the file `Files/example.txt` if it exists.

### 🛠 Code Snippet:
```js
if (req.method === 'DELETE' && req.url === '/file') {
    fs.unlink('Files/example.txt', (err) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error deleting file (it might not exist)');
            return;
        }
        res.statusCode = 200;
        res.end('File example.txt deleted successfully');
    });

}
```
### Test the Endpoint in `Postman`: Sample Request:
- **Method:** `DELETE`
- **URL:** `/file`
---

## Handle Invalid Request:
If user sends any other request then send 404 Not Found!

```js
res.statusCode = 404;
res.setHeader('Content-Type', 'text/plain');
res.end('404 Not Found: The requested URL does not exist');
```
This will catch all unmatched routes and respond with a proper status code and message (usually a 404 Not Found).


### Step 4: Run the Server

```bash
node server.js
```

---

## Notes
- This basic file server doesn't use any external libraries.
- You can extend it by using frameworks like `Express` for more features.

---