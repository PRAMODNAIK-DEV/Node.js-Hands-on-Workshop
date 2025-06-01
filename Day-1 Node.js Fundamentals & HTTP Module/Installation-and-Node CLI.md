# 🟢 Node.js Installation & Introduction to Node CLI

## 🚀 Step 1: Install Node.js

### 🔸 Download and Install

1. Go to the official Node.js website:  
   👉 [https://nodejs.org/en](https://nodejs.org/en)

2. Download the **LTS (Recommended)** version for your operating system.

3. Follow the setup wizard to complete the installation.

---

### 🔍 Verify Installation

After installation is complete, open a `terminal` or `command` prompt and run:

```bash
node -v
```

Expected output (your version may differ):

```
v22.11.0
```

Check npm version:

```bash
npm -v
```

Expected output:

```
10.9.0
```

---

## 💻 Node CLI (REPL)

Node `CLI` (Command Line Interface) allows you to execute JavaScript code directly in the terminal using the built-in **REPL (Read-Eval-Print Loop)** environment.

### ▶️ Open Node CLI

In your terminal, type:

```bash
node
```

You’ll see something like:

```
Welcome to Node.js v22.11.0.
Type ".help" for more information.
>
```

### ✏️ Try the Following Commands

```bash
console.log("Hello from Node CLI!");
```

Output:

```
Hello from Node CLI!
```

Perform calculations:

```bash
2 + 3
```

Output:

```
5
```

Create and call a function:

```bash
function add(a, b) {
  return a + b;
}

add(4, 5)
```

Output:

```
9
```

### ❌ Exit the Node CLI

To exit the CLI, type:

```bash
.exit
```

Or press `Ctrl + C` twice.

---

## 📄 Running a JavaScript File with Node.js
Let's create a new folder with a preferred name where we'll keep all the hands-on code and projects.
Use Windows `File Explorer` or the `Command Prompt`.

```js
mkdir Node-JS-Workshop
```
**Note:** Open this folder in VS Code

### 1️⃣ Create the File
1. Let's create a new file named `app.js` inside Node-JS-Workshop

```
app.js
```

2. Add the following code to the file:

```js
console.log("Welcome to Node.js!");
```

---

### 2️⃣ Run the File

1. Open a terminal and navigate to the folder containing `app.js`.
2. Run the file with:

```bash
node app.js
```

You should see:

```
Welcome to Node.js!
```
---

To be continued: [Creating-Basic-HTTP-server](Creating-Basic-HTTP-server.md)