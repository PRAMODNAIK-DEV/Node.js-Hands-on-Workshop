# 🧰 Simple CLI-Based Tools in Node.js

## 🗣️ What is a CLI?
A CLI (Command Line Interface) is a way to interact with a program using text commands in a terminal or command prompt (like cmd, bash, or PowerShell).

---

## 🧑‍💻 Why Build CLI Tools in Node.js?
Node.js is perfect for building CLI tools because:

> It runs JavaScript outside the browser.
> It gives access to system-level APIs (like file system, input/output).
> It's fast and lightweight.

🔧 Example: Create a Simple CLI Tool with Node.js
Let’s create a basic CLI tool that greets the user.

📁 File: `greet.js`

```bash
const name = process.argv[2]; // Takes the third item in the argument list
console.log(`Hello, ${name || "stranger"}! 👋`);
```

▶️ Run it from Terminal:
```bash
node greet.js John
```

🧾 Output:
```bash
Hello, John! 👋
```

## 🧠 Explanation:
> process.argv is an array holding all the command line arguments.
> process.argv[0] → node
> process.argv[1] → greet.js (script name)
> process.argv[2] → "John" (your input)

---

## 🛠️ Pro Tip:
As your CLI tool grows, you can use libraries like:

> `yargs` – for argument parsing
> `chalk` – for colored terminal output
> `inquirer` – for interactive prompts

--

# Simple Todo CLI Tool with Node.js

## Overview

A basic command-line tool to add and list tasks stored in a text file (`todo.txt`).

---

### 1. Setup

Create a file named `todo.js` in your project folder.

```js
const fs = require('fs');
const file = 'todos.json';

// Load existing todos or start with empty list
function loadTodos() {
  try {
    const dataBuffer = fs.readFileSync(file);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

// Save todos to file
function saveTodos(todos) {
  const dataJSON = JSON.stringify(todos);
  fs.writeFileSync(file, dataJSON);
}
```

### 2. Add Todo

```js
function addTodo(task) {
  const todos = loadTodos();
  todos.push({ task, done: false });
  saveTodos(todos);
  console.log(`Added todo: "${task}"`);
}
```

### 3. List Todos

```js
function listTodos() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log('No todos found!');
  } else {
    console.log('Todo List:');
    todos.forEach((todo, index) => {
      const status = todo.done ? '[✔]' : '[ ]';
      console.log(`${index + 1}. ${status} ${todo.task}`);
    });
  }
}
```

### 4. Delete Todo

```js
function deleteTodo(index) {
  const todos = loadTodos();
  if (index < 1 || index > todos.length) {
    console.log('Invalid todo number');
    return;
  }
  const removed = todos.splice(index - 1, 1);
  saveTodos(todos);
  console.log(`Deleted todo: "${removed[0].task}"`);
}
```

### 5. Parse Command Line Arguments

```js
const [,, command, ...args] = process.argv;

switch(command) {
  case 'add':
    addTodo(args.join(' '));
    break;
  case 'list':
    listTodos();
    break;
  case 'delete':
    deleteTodo(parseInt(args[0]));
    break;
  default:
    console.log('Commands: add, list, delete');
}
```

---

## How to Use

- **Add a todo:**  
  ```bash
  node todo.js add "Learn Node.js"
  ```

- **List todos:**  
  ```bash
  node todo.js list
  ```

- **Delete a todo by its number:**  
  ```bash
  node todo.js delete 2
  ```

---

## Summary

- We used the `fs` module to read/write JSON data.
- Command-line arguments are accessed with `process.argv`.
- We implemented three basic commands: `add`, `list`, and `delete`.
- This simple CLI tool helps manage todos without a graphical UI.

---

**This is a foundational example. You can extend it with more features like marking todos as done, editing tasks, or storing data in a database.**
