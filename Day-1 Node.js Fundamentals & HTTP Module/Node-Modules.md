# 📦 Node.js Modules

Node.js uses a `modular approach` to `organize` and `reuse` code across applications. A **module** in Node.js is a JavaScript file that **encapsulates related code**. Modules can export functions, objects, or variables to be used in other files.

---

## 🔹 Types of Node.js Modules

1. **Core Modules** – Built into Node.js (e.g., `fs`, `http`, `path`)
2. **Local Modules** – Custom modules you create
3. **Third-party Modules** – Installed using `npm` (e.g., `express`, `lodash`)

---

## 📁 1. Core Modules

These are included with `Node.js`, **no installation required**.

### Example: 
### Using the `fs` Module: (CommonJS Syntax)

```js
const fs = require('fs');

fs.writeFileSync('example.txt', 'Hello from Node.js!');
```

### OR (ECMAScript Syntax)

```js
import { writeFile } from 'fs/promises';

await writeFile('example.txt', 'Hello from Node.js!');

```

- Note: `await` is an operator used inside an `async` function to pause the execution of the function until a **Promise is `resolved` or `rejected`**.
---

## 📁 2. Local Modules

You can define **your own module** in a separate file and use it in other files.

### Step 1: Create a Module (`math.js`)

```js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

### Step 2: Import and Use It

```js
const math = require('./math');
console.log(math.add(2, 3)); // Output: 5
```

---

## 📁 3. Third-party Modules
These are modules created by **third-party developers** and are not included with Node.js. You can install third-party modules using `npm` (Node Package Manager) and then use `require()` to include them in your application.

### Installing `lodash` using npm:
Lodash is a very p**opular utility library** in JavaScript and Node.js that provides a lot of helpful functions to make working with `arrays`, `objects`, `strings`, and more easier and cleaner.

```bash
npm install lodash
```

### Example: Using Lodash

```js
const _ = require('lodash');

const numbers = [1, 2, 3, 4];
console.log(_.reverse(numbers)); // Output: [4, 3, 2, 1]
```

---

## 🧠 `require` vs `module.exports`

- `require` is used to **import** modules.
- `module.exports` is used to **export** functionality from a module.

---

## 📘 Summary

| Type             | Examples        | Description                             |
|------------------|------------------|-----------------------------------------|
| Core Modules     | `fs`, `http`     | Built-in modules                        |
| Local Modules    | `./math.js`      | Your own files                          |
| Third-party      | `express`, `axios`| Installed via npm                       |

- Using modules helps in breaking your code into `reusable`, `maintainable` parts.
---
<br>

# 🔄 Node.js Module Systems: CommonJS vs ESM

## Node.js supports two main types of module systems:
## 🔹 1. CommonJS (CJS)

### ✅ What is it?

CommonJS is the original module system used in Node.js. It's **synchronous** and uses `require` and `module.exports`.

### 📄 Syntax Example

**File: `math.js`**

```js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

**File: `app.js`**

```js
const math = require('./math');

console.log(math.add(2, 3)); // Output: 5
```

---

## 🔹 2. ECMAScript Modules (ESM)

### ✅ What is it?

ESM is the standard module system defined in JavaScript (ES6) and is supported in modern browsers and Node.js (v12+).

**ECMA:** `European Computer Manufacturers Association` - A script language standard maintained by the European Computer Manufacturers Association.

### 📄 Syntax Example

**File: `math.mjs`** or **`math.js`** (with `"type": "module"` in `package.json`)

```js
export function add(a, b) {
  return a + b;
}
```

**File: `app.mjs`** or **`app.js`**

```js
import { add } from './math.js';

console.log(add(2, 3)); // Output: 5
```

---

## 🛠️ Real-World Example – Writing to a File

### ✅ Using CommonJS

**File: `writeFileCommonJS.js`**

```js
const fs = require('fs');

fs.writeFileSync('example.txt', 'Hello from Node.js!');
```

### ✅ Using ESM

**File: `writeFileESM.mjs`** OR with `"type": "module"` in `package.json`

```js
import { writeFile } from 'fs/promises';

await writeFile('example.txt', 'Hello from Node.js!');
```

---

## 📦 `package.json` Configs

### For ESM:

```json
{
  "type": "module"
}
```

### For CommonJS (default):

```json
{
  "type": "commonjs"
}
```

---

✅ Choose the right module system based on your project requirements and compatibility needs.

---

# 📦 Important Core/Built-in Modules in Node.js

Node.js comes with several built-in modules. Below are some of the most commonly used ones:

## 1. `fs` (File System)
Used for **file operations** like `reading`, `writing`, or `deleting` files.

```js
// fs-example.js
const fs = require('fs');

// Write a file
fs.writeFileSync('demo.txt', 'Hello from Node.js');

// Read the file
const data = fs.readFileSync('demo.txt', 'utf-8');
console.log(data); // Output: Hello from Node.js
```

---

## 🌐 2. `http` (Create a Basic Web Server)
The http module is a built-in Node.js module that allows you to **create `HTTP` servers** and **make HTTP requests**.

It's the core module **used for building web servers** or clients without needing any external dependencies.
```js
// http-example.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js server!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

👉 Visit `http://localhost:3000` in your browser after running this.

---

## 🛠️ 3. `path` (Work with File Paths)

The path module is a built-in Node.js module that provides **utilities** for working with `file` and `directory` **paths**.

It helps you handle and manipulate file system paths in a way that works across **different operating systems** (`Windows`, `Linux`, `macOS`).

This is important because **file paths have different formats depending on the OS** (e.g., Windows uses backslashes `\`, Unix-based systems use forward slashes `/`).

```js
// path-example.js
const path = require('path');

const filePath = '/users/admin/test.txt';

console.log(path.basename(filePath));  // test.txt
console.log(path.dirname(filePath));   // /users/admin
console.log(path.extname(filePath));   // .txt
```

---

## 🧮 4. `os` (Operating System Info)
The os module is a built-in Node.js module that provides **operating system-related `utility` methods**.

It lets you get information about the current operating system your Node.js process is running on.

Useful for **system-level info**, like `CPU`, `memory`, `hostname`, `user info`, and `platform` details.
```js
// os-example.js
const os = require('os');

console.log('Platform:', os.platform());
console.log('CPU Cores:', os.cpus().length);
console.log('Free Memory:', os.freemem());
```

---

## 🔗 5. `url` (Parse and Format URLs)
The url module is a built-in Node.js module that provides **utilities to `parse`, `format`, and `manipulate` URLs**.

It helps you **break down** a URL string into its components or **build a URL** from parts.

Useful when working with web servers, HTTP requests, or anywhere URLs need to be handled programmatically.
```js
// url-example.js
const url = require('url');

const myUrl = new URL('https://example.com/page?name=pramod&age=24');

console.log(myUrl.hostname);             // example.com
console.log(myUrl.pathname);             // /page
console.log(myUrl.searchParams.get('name')); // pramod
```

---

> 💡 All these modules are **core modules** and **require no external installation**. Just use `require('module-name')` in Node.js and you're good to go!.

---

## To be continued: [File-System-Operation](File-System-Operation.md)
