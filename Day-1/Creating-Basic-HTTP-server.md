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
> If your project is hosted on GitHub, GitLab, Bitbucket or another VCS, provide the repo URL. This tells others (and tools like npm or yarn) where the source code is hosted.

```plaintext
keywords:
```
> Tags to help others find your project, like `node`, `server`, `workshop`. This willl help others discover your project if you publish it publicly to the npm registry (https://www.npmjs.com/).
> If you're just building a local project or a workshop demo (not publishing to npm), keywords are optional. They won’t affect your project functionality.

```plaintext
author:
```
> Your name or the name of the maintainer.

```plaintext
license: (ISC)
```
> The license under which your project is shared. This defines how others are allowed to use, modify, and share your code. 🧾 ISC – Internet Systems Consortium License

---

After completing the prompts, you’ll see a message like:

```plaintext
About to write to <Relative Path of your project>\simple-node-server\package.json:
```

This creates a `package.json` file with the values you entered, which is useful for:
- Tracking dependencies
- Managing scripts
- Organizing project metadata

---

## 📝 Step 2: Create the Server File

Create a file named `server.js`:

```bash
server.js
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

### `Output:`
- `Server running at http://127.0.0.1:3000/`

This tells reach out to the Domain  127.0.0.1 or localhost in that access port 3000

### `Where:`
- 127.0.0.1 → This is the loopback IP address (points back to your own computer), also known as localhost, which points to your own machine.

- :3000 → This is the port number, telling your system to connect to the specific server (or app) that is listening on port 3000.

## 🧠 Understanding `hostname` and `port`

### ✅ `hostname`
- `'127.0.0.1'` or `'localhost'` refers to your **own computer**.
- It restricts the server to **accept requests only from your device**.

### ✅ `port`
- The **port number** is like a **doorway** through which your app talks to the network.
- Each app on your system that talks over the network uses a **unique port**.
- Port `3000` is a common choice for development servers.

### 📊 Port Number Range
| Range         | Description                          |
|---------------|--------------------------------------|
| 0–1023        | Reserved (e.g., HTTP=80, HTTPS=443) |
| 1024–49151    | Registered (safe for custom apps)   |
| 49152–65535   | Dynamic/private (temp/test use)     |

⚠️ Ports **must be unique** per app. Two apps with same Host/Domain Name cannot use the same port at the same time.
⚠️ But two different Host/Domains (or IP addresses) can absolutely use the same port number — because the combination of IP address + port number must be unique, not just the port alone.
---

## 🧑‍💻 Why Port Is Needed

### 💡 Imagine your computer is like an apartment:
- **IP address** = the **building address**
- **Port number** = the **room number**
- You need both to reach the **correct resident (server)**.

If you're running:
```js
// Server 1
server.listen(3000);

// Server 2
server.listen(5000);
```
Both can run on `localhost` but on **different ports**, so they don’t interfere with each other.

> ✅ Yes — many servers can run on your PC, but they **must listen on different ports** to avoid conflicts.

---

### 🔁 Summary Table
| Term         | Example Value         | Meaning                                      |
|--------------|------------------------|----------------------------------------------|
| Hostname     | `localhost` / `127.0.0.1` | Your own computer                          |
| Port         | `3000`, `5000`, etc.     | Identifies which server or service to talk to |
| URL          | `http://localhost:3000` | Connects to specific app on specific port   |

---
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
