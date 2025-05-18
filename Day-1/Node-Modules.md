# 📦 Node.js Modules

Node.js uses a modular approach to organize and reuse code across applications. A **module** in Node.js is a JavaScript file that encapsulates related code. Modules can export functions, objects, or variables to be used in other files.

---

## 🔹 Types of Node.js Modules

1. **Core Modules** – Built into Node.js (e.g., `fs`, `http`, `path`)
2. **Local Modules** – Custom modules you create
3. **Third-party Modules** – Installed using `npm` (e.g., `express`, `lodash`)

---

## 📁 1. Core Modules

These are included with Node.js, no installation required.

### Example: Using the `fs` Module

```js
const fs = require('fs');

fs.writeFileSync('example.txt', 'Hello from Node.js!');
```

### OR

```js
import { writeFile } from 'fs/promises';

await writeFile('example.txt', 'Hello from Node.js!');

```

---

## 📁 2. Local Modules

You can define your own module in a separate file and use it in other files.

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

Install using npm:

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

✅ Using modules helps in breaking your code into reusable, maintainable parts.
