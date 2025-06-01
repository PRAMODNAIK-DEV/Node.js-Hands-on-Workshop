# 📂 File System Operations in Node.js

### 📘 What is the `fs` Module?
The `fs` (File System) module in Node.js allows you to work with the **file system on your computer** — like **creating, reading, updating, deleting, and renaming `files` and `folders`.**

---

### 🔄 Two Ways to Use `fs`:

| Method                          | Description                            | Blocking?      |
| ------------------------------- | -------------------------------------- | -------------- |
| Synchronous (`fs.readFileSync`) | Executes immediately, blocks next code | ✅ Blocking     |
| Asynchronous (`fs.readFile`)    | Uses `callbacks` or `Promises`             | ❌ Non-blocking |

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
### 📘 Summary Table

| Operation     | Method                    | Blocking Version      |
| ------------- | ------------------------- | --------------------- |
| Read File     | `fs.readFile()`           | `fs.readFileSync()`   |
| Write File    | `fs.writeFile()`          | `fs.writeFileSync()`  |
| Append File   | `fs.appendFile()`         | `fs.appendFileSync()` |
| Delete File   | `fs.unlink()`             | `fs.unlinkSync()`     |
| Create Folder | `fs.mkdir()`              | `fs.mkdirSync()`      |
| Delete Folder | `fs.rmdir()` or `fs.rm()` | `fs.rmSync()`         |