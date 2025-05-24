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

> ✅ Visit `http://localhost:3000/read` or `http://localhost:3000/write` in your browser.

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