# 🔄 Request-Response Cycle in Express.js

In **Express.js**, the **Request-Response Cycle** refers to the full sequence of events that occurs when a client (like a browser or Postman) sends a request to the server and receives a response back.
- Use the req object to access the `request` details.
- Use the res object to send a `response` back to the client.
---

![Request-Response Cycle in Express](./images//Request-Response%20Cycle%20in%20Express.png)

---

## 📥 1. Request (`req`) in Express.js

When a client sends an HTTP request, Express gives you a `req` object representing that request. It contains useful information like:

### 🔧 Request Properties:

| Property      | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| `req.method`  | HTTP method (GET, POST, PUT, DELETE, etc.)                           |
| `req.url`     | Requested URL                                                        |
| `req.headers` | Request headers                                                      |
| `req.params`  | URL parameters (e.g., `/user/:id`)                                   |
| `req.query`   | Query string (e.g., `?name=John`)                                    |
| `req.body`    | Body data (for POST/PUT) – requires middleware like `express.json()` |

---

## 🧪 Example

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/user', (req, res) => {
    console.log(req.method);    // GET
    console.log(req.url);       // /user
    console.log(req.headers);   // Request headers

    res.send('User Info Received');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

```
1. ***🧩Middleware to Parse JSON***

    ```js
    app.use(express.json());
    ```

    - This line registers middleware that automatically parses incoming JSON payloads in POST, PUT, or PATCH requests.
    - Required for accessing `req.body` in JSON-based requests.
    - Without this, req.body would be undefined for JSON input.

---


## 📤 2. Response (`res`) in Express.js

To respond to a request, you use the `res` object. It allows you to send data (HTML, JSON, files, etc.) back to the client.

---

## 🧾 Basic Usage

```js
app.get('/example', (req, res) => {
    res.send('Hello World');
});
```

- Sends a simple response back to the client.
- Ends the response process.

---

## 🧰 Common `res` Methods

### 1. `res.send()`

```js
res.send('Hello');
```

- Sends a string, object, buffer, or array as a response.
- Automatically sets the content-type based on input.

---

### 2. `res.json()`

```js
res.json({ user: 'John', age: 30 });
```

- Sends a JSON response.
- Useful for APIs.

---

### 3. `res.status()`

```js
res.status(404).send('Not Found');
```

- Sets the HTTP status code.
- Can be chained with other methods like `.send()` or `.json()`.

---

### 4. `res.set()`

```js
res.set('Content-Type', 'text/plain');
```

- Sets custom response headers.

---

### 5. `res.redirect()`

```js
res.redirect('/new-route');
```

- Redirects the client to another route.

---

### 6. `res.end()`

```js
res.end();
```

- Ends the response without sending any data.

---

## 🧪 Example: Using Multiple Methods

```js
app.get('/info', (req, res) => {
    res.status(200)
       .set('Custom-Header', 'Example')
       .json({ message: 'Response object demo' });
});
```

---

## 📚 Tip

Always **send only one response per request**. Calling `res.send()` or `res.json()` ends the response — additional calls will result in an error.

---

## ✅ Summary

| Method           | Description                  |
| ---------------- | ---------------------------- |
| `res.send()`     | Sends string, buffer, object |
| `res.json()`     | Sends JSON                   |
| `res.status()`   | Sets HTTP status code        |
| `res.set()`      | Sets custom headers          |
| `res.redirect()` | Redirects to another route   |
| `res.end()`      | Ends response without data   |

---

## 🧭 Summary

- `req` lets you access all incoming request data.
- `res` is used to build and send the response.
- Understanding the cycle is essential for working with **routes, middleware, and controllers**.

