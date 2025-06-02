
# Middleware in Node.js and Express

Middleware functions are `functions` that have access to the **request object** (`req`), the **response object** (`res`), and the `next` *middleware function* in the application’s **request-response cycle**. 
They can:
- `Execute` any code.
- `Modify` the **request** and the **response** objects.
- `End` the **request-response cycle**.
- `Call` the **next middleware function** in the stack.


## Types of Middleware

1. **Application-level middleware**: Functions that are `bound` to an **instance of the Express app** and handle requests for `all` or `specific` **routes**.
2. **Router-level middleware**: Similar to application-level middleware but **bound to an instance of `express.Router()`**, allowing modular route handling. It behaves just like application-level middleware but **only applies to the specific router it’s attached to**.
3. **Error-handling middleware**: Middleware that takes four arguments `(err, req, res, next)` and is used to **catch** and **process** errors in the app.
4. **Built-in middleware**: Middleware functions provided by Express (e.g., express.json(), express.static()) to handle common tasks.
5. **Third-party middleware**: External middleware **installed via npm **(e.g., body-parser, cors) to add additional functionality to Express apps.

---

## 1. Custom Middleware

Custom middleware functions are `user-defined` and are often used to perform tasks such as `logging`, `authentication`, or `request validation`.

### Example: Logging Middleware

```js
const express = require('express');
const app = express();

// Custom middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next handler
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
**Explanation**: This middleware `logs` **every HTTP method and URL** that comes into the server. It's executed for **every request** because it's  an `Application-Level` Middleware applied using `app.use()`.

---

### Example: Authentication Middleware

```js
const authenticate = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (auth === 'secret-token') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

app.get('/protected', authenticate, (req, res) => {
    res.send('You are authorized');
});
```

**Explanation**: This middleware checks for a specific **authorization header**. If the header matches the expected token, the request is allowed to continue. Otherwise, the client receives a `403 Forbidden` response.

---
## 2. Third-Party Middleware

These are middleware functions developed by the `community` and `published` as Node.js packages.

### Example 1: `body-parser` - Parse incoming request bodies

```bash
npm install body-parser
```

```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/data', (req, res) => {
    res.send(`You sent: ${JSON.stringify(req.body)}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

**Explanation**: This middleware parses incoming JSON request bodies so that they can be accessed via `req.body`. It’s essential for handling POST and PUT requests with JSON data.

---

### Example-2: `morgan` for logging
`Morgan` is a `third-party middleware` for **HTTP request logging** in Node.js/Express applications. It logs details like `method`, `URL`, `status code`, `response time`, etc., helping developers `monitor` and `debug` their applications easily.

**🔧 Why use Morgan?**
 - `Logs` every incoming HTTP request
 - Supports predefined `formats` (e.g., tiny, dev, combined)
 - Can write logs to a file or the console.

**📦 Installation**
```bash
npm install morgan
```
**Code:**
```js
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
```
***Output:*** When user visits and sends any request to the server then this request details will be logged to the conole.
Example:

```JS
Server is running at http://localhost:3000
::1 - - [25/May/2025:11:53:09 +0000] "GET / HTTP/1.1" 200 9 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0"
::1 - - [25/May/2025:11:53:11 +0000] "GET /favicon.ico HTTP/1.1" 404 150 "http://localhost:3000/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0"
```

**Explanation**: `Morgan` logs detailed request information in a standardized format. `combined` is one of several predefined formats.

---

## Best Practices

- Always call `next()` in your middleware unless ending the response.
- Use `next(err)` to pass errors to error-handling middleware.
- Modularize and separate middleware for maintainability.
- Apply middleware selectively when needed using route-level middleware.

## Conclusion

Middleware in Express **enhances the functionality of your app** by **providing control over how requests are handled**. By combining `custom` middleware and `third-party` middleware, you can build powerful and flexible APIs.
---
## To be continued: [Handling-Client-Request-Data](Handling-Client-Request-Data.md)