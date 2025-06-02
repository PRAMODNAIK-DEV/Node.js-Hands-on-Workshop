
# Using `nodemon` in Node.js

## What is `nodemon`?
`nodemon` is a `utility` that **automatically restarts your Node.js `Server` or `Application`** whenever it **detects changes** in your source files. It's especially useful during development to avoid manually restarting the server after every code change.

---

## 1. Installation

You can install `nodemon` globally or locally (as a dev dependency).

### Install Globally (available everywhere):
```bash
npm install -g nodemon
```

### Install Locally (recommended for projects):
```bash
npm install --save-dev nodemon
```

---

## 2. Running Your App with `nodemon`

Assume your main file is `index.js` or `app.js`. You can run your app with:

### If installed globally:
```bash
nodemon app.js
```

### If installed locally (using `npx`):
```bash
npx nodemon app.js
```

---

## 3. What is `npx`?

`npx` is a tool that comes with Node.js (from version 5.2.0 onwards). It **lets you run executables from your project's `node_modules` directory**.

### Example:
```bash
npx nodemon index.js
```
This runs `nodemon` even if it’s not globally installed.

---

## 4. Add Script in `package.json`

You can simplify the command using `scripts` in `package.json`:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

Now run the app with:
```bash
npm run dev
```

---

## 5. Custom Configurations (Optional)

You can watch specific directories and extensions.

### Command-line config:
```bash
nodemon --watch src --ext js,json --exec "node src/index.js"
```

### Or use `nodemon.json` file:

```json
{
  "watch": ["src"],
  "ext": "js,json",
  "exec": "node src/index.js"
}
```

Then simply run:
```bash
npx nodemon
```

---

## Summary

- Use `nodemon` to automatically restart your Node.js app on code changes.
- Prefer local installation + `npx` to avoid global dependency issues.
- Use `npm run dev` with scripts for cleaner workflows.

---
