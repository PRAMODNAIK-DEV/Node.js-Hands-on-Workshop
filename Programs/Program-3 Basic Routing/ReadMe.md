# Node.js Basic Routing Server

## Problem Statement
Create a basic Node.js server that routes requests based on the URL path. The server should:

- Return "Welcome to the homepage!" for `/`
- Return "Page not found" with a 404 status for any other URL

---

## Functional Requirements
1. Use basic Node.js HTTP module.
2. Use `if/else` conditions to handle different routes.
3. Return correct status codes:
   - `200` for known paths like `/`
   - `404` for unknown paths

---

## Folder Structure
```
basic-routing-server/
  ├── server.js
  └── README.md
```

---

## Step-by-Step Instructions

### 1. Initialize a Project Folder
```bash
mkdir basic-routing-server
cd basic-routing-server
```

### 2. Create `server.js` and place the below code init

```js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the homepage!');
    } else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is about Page!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### 3. Run the Server
```bash
node server.js
```

### 4. Test the Server
- Visit: [http://localhost:3000/](http://localhost:3000/) → Should show `Welcome to the homepage!`
- Visit: [http://localhost:3000/about](http://localhost:3000/about) Should show `This is about Page!!` and any other path → Should show `Page not found`

---

## Test Cases
| Test Case ID | Request Path | Expected Response          | Status Code | Notes                                       |
| ------------ | ------------ | -------------------------- | ----------- | ------------------------------------------- |
| TC-01        | `/`          | "Welcome to the homepage!" | 200         | Root path should return homepage.           |
| TC-02        | `/about`     | "This is about Page!"      | 200         | About path should return about page details |
| TC-03        | `/contact`   | "Page not found"           | 404         | Should return 404 for unknown path.         |
| TC-04        | `/home`      | "Page not found"           | 404         | Another test for unknown path.              |

---

## Summary
This Node.js server demonstrates basic HTTP routing using the core `http` module. It checks the request URL and responds accordingly with either a homepage message or a 404 error. It also helps beginners understand conditional routing logic in Node.js.

---
