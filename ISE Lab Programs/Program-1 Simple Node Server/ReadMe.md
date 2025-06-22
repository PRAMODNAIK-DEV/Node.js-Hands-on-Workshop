
# Node.js Native HTTP Server – Product CRUD API
This is a simple Node.js application that creates an HTTP server using the built-in `http` module. It listens on **port 3000** and handles specific routes with appropriate responses.

---

## ✅ Functional Requirements

- Respond with `"Hello, World!"` for `/` route.
- Respond with `"This is the About page."` for `/about` route.
- Respond with **404 status** and `"Page not found"` for any other route.
- Set proper `Content-Type` headers for all responses.
- Server runs indefinitely until manually stopped.



## Instructions to Build and Run

### Step 1: Prerequisites
- Make sure Node.js is installed.

To verify installation:
```bash
node -v
```
This should display the specific version of `Node.js` you have installed, for example:
```bash
v22.11.0
```
---

### Step 2: Project Setup or Directly
Use the VS Code to Create the folder instead of using mkdir in Terminal

1. Create a new directory:
```bash
mkdir simple-node-server
cd simple-node-server
npm init -y
```

2. Create a file named `server.js`:
```bash
server.js
```

## 🧑‍💻 Step 3: Write the HTTP Server Code

Let's create a simple **Node.js server** using the built-in `http` module, which responds with `"Hello, Node.js Server!"` to any client request.

Paste the following code into a `server.js`:

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');      // Indicates the type of data sent to Client

  if (req.url === '/') {
    res.statusCode = 200;                           // Status Code OK
    res.end('Hello, World!');                       // End the Response with Hello, Node.js Server!
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end('This is the About page.');
  } else {
    res.statusCode = 404;                           // Status Code Not Found!
    res.end('Page not found');
  }
});

server.listen(port, hostname, () => {             // START the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

## 🌐 Access the Server

Open your browser or use curl/Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/about](http://localhost:3000/about)
- [http://localhost:3000/invalid](http://localhost:3000/invalid)

---

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

- ⚠️ Ports **must be unique** per app. Two apps with same Host/Domain Name cannot use the same port at the same time.
- ⚠️ But **two different Host/Domains** (or IP addresses) can absolutely use the **same port number** — because the combination of IP address + port number must be unique, not just the port alone.
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