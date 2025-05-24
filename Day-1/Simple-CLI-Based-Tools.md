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

---

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

Here,
> fs.readFileSync() is a synchronous method provided by Node.js's fs (File System) module.

> It reads the contents of the file specified by the variable file (likely 'todos.json').

> It blocks the event loop until the entire file is read.

> It returns a buffer (binary data).

### 🔍 Step-by-step Explanation
1. **📥 Reading File Synchronously**
   
    ```js
    const dataBuffer = fs.readFileSync(file);
    ```
    - Reads the contents of the file from the disk.
    - `fs.readFileSync()` is **synchronous**, meaning it blocks further code execution until the file is fully read.
    - Suitable for CLI-based tools where tasks are sequential.

2. **🔤 Converting Buffer to String**

    ```js
    const dataJSON = dataBuffer.toString();
    ```
    - Converts the buffer (binary data) into a readable string format.

3. **🔄 Parsing JSON Data**

    ```js
    return JSON.parse(dataJSON);
    ```
    - Converts the JSON string into a usable JavaScript object (likely an array of todos).

### 💡 Why Use Synchronous File Reading?

- For CLI-based tools, **simplicity and readability** matter more than performance.
- Blocking is acceptable in sequential operations.
- Easier to reason about during small utility script execution.

---

### 2. Add Todo

```js
function addTodo(task) {
  const todos = loadTodos();
  todos.push({ task, done: false });
  saveTodos(todos);
  console.log(`Added todo: "${task}"`);
}
```

1. **`const todos = loadTodos();`**
    - Loads the current list of todos from the file using the `loadTodos()` function.
    - Returns an array of todo objects.

2. **`todos.push({ task, done: false });`**
    - Adds a new task to the list.
    - The new task is represented as an object with:
        - `task`: The description of the task passed as an argument.
        - `done`: A boolean flag set to `false` initially (meaning the task is not completed).

3. **`saveTodos(todos);`**
    - Persists the updated todo list back to the file by calling `saveTodos()`.
    - This ensures that the new task is saved.

4. **`console.log(...)`**
    - Logs a confirmation message to the console to notify that the task was added.

---

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
## 🔧 How It Works

1. **Load the Todo List**
   - `const todos = loadTodos();`  
     This line calls another function (likely reading from a file or database) to fetch the current list of todos.

2. **Check if the List is Empty**
   - If no todos are found, it logs:  
     ```
     No todos found!
     ```

3. **Display the List**
   - If todos exist, it logs:  
     ```
     Todo List:
     ```
   - Then loops through each `todo`, displaying:
     - Its **index**
     - A **checkbox-style status**:
       - `[✔]` if the todo is marked as done
       - `[ ]` if not done
     - The **task description**

---

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

## 🔧 How It Works

1. **Load the Todo List**
   - `const todos = loadTodos();`  
     Loads the current list of todos.

2. **Validate the Index**
   - Checks whether the provided index is valid:
     - Less than 1 or greater than the number of todos → invalid.
     - Logs: `'Invalid todo number'` and exits the function.

3. **Delete the Todo**
   - Uses `splice(index - 1, 1)` to remove the specified todo (JavaScript arrays are 0-based).

4. **Save the Updated List**
   - Calls `saveTodos(todos);` to persist the updated todo list.

5. **Confirm Deletion**
   - Logs the deleted task's description:  
     ```
     Deleted todo: "Task description"
     ```

---

### 5. Parse Command Line Arguments

## 🔍 Purpose
This code snippet is a **command-line interface (CLI) command parser**. It reads arguments from the terminal and delegates actions like adding, listing, or deleting todos based on user input.

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
## 🔧 How It Works

### 1. **Argument Extraction**
```js
const [,, command, ...args] = process.argv;
```
- `process.argv` is an array of command-line arguments.
- The first two values (`process.argv[0]` and `process.argv[1]`) are ignored.
- `command` holds the operation name (`add`, `list`, or `delete`).
- `args` holds any additional arguments (like todo content or index).

### 2. **Command Handling with switch-case**

#### ➕ `add`
```js
addTodo(args.join(' '));
```
- Joins all arguments as a string and passes them to the `addTodo` function.

#### 📋 `list`
```js
listTodos();
```
- Calls `listTodos()` to print the todo list.

#### ❌ `delete`
```js
deleteTodo(parseInt(args[0]));
```
- Parses the first argument as an integer and deletes the todo at that position.

#### ❓ `default`
```js
console.log('Commands: add, list, delete');
```
- If an unknown command is entered, it displays valid commands.

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
