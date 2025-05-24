## 📂 File System Operations in Node.js

### 📘 What is the `fs` Module?
The `fs` (File System) module in Node.js allows you to work with the **file system on your computer** — like creating, reading, updating, deleting, and renaming files and folders.

---

### 🔄 Two Ways to Use `fs`:

| Method                    | Description                         | Blocking?      |
|---------------------------|-------------------------------------|----------------|
| Synchronous (`fs.readFileSync`) | Executes immediately, blocks next code | ✅ Blocking |
| Asynchronous (`fs.readFile`)     | Uses callbacks or Promises             | ❌ Non-blocking |

---

### ✅ 1. Importing the fs Module

```js
const fs = require('fs');
```

---

### 📄 2. Reading a File

#### ✅ Asynchronous:
```js
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});
```

#### ✅ Synchronous:
```js
const data = fs.readFileSync('example.txt', 'utf8');
console.log("File content:", data);
```

---

### ✏️ 3. Writing to a File

#### ✅ Asynchronous:
```js
fs.writeFile('output.txt', 'Hello from Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});
```

#### ✅ Synchronous:
```js
fs.writeFileSync('output.txt', 'Hello again!');
```

---

### 🆕 4. Appending to a File

```js
fs.appendFile('output.txt', '\nThis is a new line.', (err) => {
  if (err) throw err;
  console.log('Content appended!');
});
```

---

### ❌ 5. Deleting a File

```js
fs.unlink('output.txt', (err) => {
  if (err) throw err;
  console.log('File deleted successfully!');
});
```

---

### 📁 6. Creating a Folder

```js
fs.mkdir('myFolder', (err) => {
  if (err) throw err;
  console.log('Folder created!');
});
```

---

### 🚫 7. Removing a Folder

```js
fs.rmdir('myFolder', (err) => {
  if (err) throw err;
  console.log('Folder deleted!');
});
```

> ⚠️ `fs.rmdir()` is deprecated. Prefer `fs.rm()` with `{ recursive: true }` for folders.

---

## 🖥️ Final Server

Here's how you can run basic file operations **inside an HTTP server**:

```js
const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/read') {
        fs.readFile('Files/example.txt', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(data);
        });
    } else if (req.url === '/write') {
        fs.writeFile('Files/example.txt', 'Written by Node.js Server', (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error writing file');
                return;
            }
            res.statusCode = 200;
            res.end('File written successfully');
        });
    } else if (req.url === '/delete') {
        fs.unlink('Files/example.txt', (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error deleting file (it might not exist)');
                return;
            }
            res.statusCode = 200;
            res.end('File deleted successfully');
        });

    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, Node.js Server! Use /read /write or /delete');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

```

>  Visit `http://localhost:3000/read` or `http://localhost:3000/write` in your browser.


---
## 🖥️🛠️ 📄 Building a Native RESTful HTTP Server Using Node.js and the fs Module (No Express.js)

This server demonstrates how to use the built-in `http` and `fs` modules in Node.js to handle file operations through HTTP methods.

---

## 📥 POST `/file` – Create or Overwrite File

### 📌 Description:
Writes the provided content into `Files/example.txt`. If the file does not exist, it will be created.

### ✅ Sample Request:
- **Method:** `POST`
- **URL:** `/file`
- **Body (JSON):**
```json
{
  "content": "This is the new file content."
}
```

### 🛠 Code Snippet:
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
---

## 📤 GET `/file` – Read File Content

### 📌 Description:
Reads the contents of `Files/example.txt` and sends it in the response.

### ✅ Sample Request:
- **Method:** `GET`
- **URL:** `/file`

### 🛠 Code Snippet:
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
---

## ➕ POST `/file/append` – Append to File

### 📌 Description:
Appends the provided content to the existing file.

### ✅ Sample Request:
- **Method:** `POST`
- **URL:** `/file/append`
- **Body (JSON):**
```json
{
  "content": "This is content to append."
}
```

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
---
## ❌ DELETE `/file` – Delete File

### 📌 Description:
Deletes the file `Files/example.txt` if it exists.

### ✅ Sample Request:
- **Method:** `DELETE`
- **URL:** `/file`

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
---

## 🛑 Default Route Handler

If none of the routes match, then it matches the the Root (\) route by default.

```js
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Welcome to File System Operations in Node.js! \nUse GET /file, POST /file, POST /file/append, or DELETE /file');
    
```

---
### 📘 Summary Table

| Operation     | Method                    | Blocking Version       |
|---------------|----------------------------|-------------------------|
| Read File     | `fs.readFile()`            | `fs.readFileSync()`     |
| Write File    | `fs.writeFile()`           | `fs.writeFileSync()`    |
| Append File   | `fs.appendFile()`          | `fs.appendFileSync()`   |
| Delete File   | `fs.unlink()`              | `fs.unlinkSync()`       |
| Create Folder | `fs.mkdir()`               | `fs.mkdirSync()`        |
| Delete Folder | `fs.rmdir()` or `fs.rm()`  | `fs.rmSync()`           |