# Creating a Basic HTTP Server in Node.js

## 📦 Step 1: Create a Folder and Initialize the Node.js Project

```bash
mkdir simple-node-server
cd simple-node-server
```

Before writing any code, initialize your Node.js project using `npm`.

```bash
npm init
```
You will be prompted to enter information for your project. Here's a breakdown of the prompts and what they mean:

```plaintext
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
```

### Example Prompt Walkthrough

```plaintext
package name: (simple-node-server)
```
> The name of your project. You can press Enter to accept the default or type your own.

```plaintext
version: (1.0.0)
```
> The initial version of your app. Semantic versioning (semver) is used here.

```plaintext
description: This is to test the simple server creation
```
> A short description of what your project does.

```plaintext
entry point: (index.js) server.js
```
> The main file to run when someone starts your app. We’ll use `server.js`.

```plaintext
test command:
```
> If you have a test framework set up, you can define how to run your tests.

```plaintext
git repository:
```
> If your project is hosted on GitHub or another VCS, provide the repo URL.

```plaintext
keywords:
```
> Tags to help others find your project, like `node`, `server`, `workshop`.

```plaintext
author: Pramod
```
> Your name or the name of the maintainer.

```plaintext
license: (ISC)
```
> The license under which your project is shared. ISC is fine for beginners.

---

After completing the prompts, you’ll see a message like:

```plaintext
About to write to C:\Users\pammu\Desktop\Node JS Workshop\simple-node-server\package.json:
```

This creates a `package.json` file with the values you entered, which is useful for:
- Tracking dependencies
- Managing scripts
- Organizing project metadata

---

## 📝 Step 2: Create the Server File

Create a file named `server.js`:

```bash
touch server.js
```

---

## 🧑‍💻 Step 3: Write the HTTP Server Code

Paste the following code into `server.js`:

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200; // OK
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js Server!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

---

## ▶️ Step 4: Run the Server

Use the following command to run your server:

```bash
node server.js
```

Visit `http://localhost:3000` in your browser. You should see:

```
Hello, Node.js Server!
```

---

## 🧠 Explanation

- `http.createServer()`: Creates an HTTP server instance.
- `req`: Incoming HTTP request object.
- `res`: HTTP response object.
- `res.statusCode = 200`: Sets HTTP status to OK.
- `res.setHeader(...)`: Sets response headers (e.g., `Content-Type`).
- `res.end(...)`: Sends the response and ends the request.

---

## 🧪 Try It Out

Modify the response text in `res.end()` to test changes:

```js
res.end('Welcome to my Node.js Workshop!');
```

---
