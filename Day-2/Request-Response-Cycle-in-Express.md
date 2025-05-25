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

| Property               | Description |
|------------------------|-------------|
| `req.method`           | HTTP method (GET, POST, PUT, DELETE, etc.) |
| `req.url`              | Requested URL |
| `req.headers`          | Request headers |
| `req.params`           | URL parameters (e.g., `/user/:id`) |
| `req.query`            | Query string (e.g., `?name=John`) |
| `req.body`             | Body data (for POST/PUT) – requires middleware like `express.json()` |

---

## 📤 2. Response (`res`) in Express.js

To respond to a request, you use the `res` object. It allows you to send data (HTML, JSON, files, etc.) back to the client.

### 🛠️ Response Methods:

| Method                | Description |
|------------------------|-------------|
| `res.send()`          | Sends plain text or HTML |
| `res.json()`          | Sends a JSON response |
| `res.status()`        | Sets the HTTP status code |
| `res.redirect()`      | Redirects to another URL |
| `res.sendFile()`      | Sends a file as a response |

---

## 🧪 Example

```js
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const q = req.query.name;

  console.log(req.method); // GET
  console.log(req.headers); // headers
  console.log(req.url); // /user/123?name=John

  res.status(200).json({
    id: userId,
    name: q,
    message: 'User data fetched successfully!'
  });
});
```

---

## 🧭 Summary

- `req` lets you access all incoming request data.
- `res` is used to build and send the response.
- Understanding the cycle is essential for working with **routes, middleware, and controllers**.

