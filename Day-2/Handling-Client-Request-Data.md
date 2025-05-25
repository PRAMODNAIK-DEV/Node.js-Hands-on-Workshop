# Express.js `req` (Request) Object - Handling Request Data

The `req` object in Express.js represents the HTTP request and contains all the data sent from the client to the server.
1. `Query` Parameters
2. `URL`/`Route` Parameters
3. Request `Body`
4. Headers
5. Cookies
---

## 📥 1. Query Parameters

**Example URL:**
Query parameters are part of the URL and follow a <domain-name>:<port-number>/<endpoint>/`?key1=value1&key2=value2&keyn=valuen` format.

- Query parameters are key-value pairs in the URL after the `?`.
- Access them using `req.query`.

***Syntax***
```JS
<domain-name>:<port-number>/<endpoint>/`?key1=value1&key2=value2&keyn=valuen`
```

**Example URL:**
```JS
http://localhost:3000/greet`?name=Pramod`
```

**Explanation:**

- `http://localhost`: Domain Name (host)
- `3000`: Port Number
- `/greet`: Endpoint
- `?name=Pramod`: Query Parameter (`name` is the key, `Pramod` is the value)


### Create a Endpoint in the Backend which handles the above data from the Client:
```js
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest'; // Default to 'Guest' if no name is provided
    res.send(`Hello, ${name}!`);
});
```

**Explanation**

- `app.get('/greet', ...)`: Defines a GET endpoint at the `/greet` path.
- `req.query.name`: Retrieves the value of the `name` query parameter from the URL.
- `|| 'Guest'`: If `name` is not provided in the query string, the default value `'Guest'` is used.
- ``res.send(`Hello, ${name}!`)``: Sends a plain text response back to the client with a personalized greeting.

### Example URLs

- `http://localhost:3000/greet?name=Pramod` → Response: `Hello, Pramod!`
- `http://localhost:3000/greet` → Response: `Hello, Guest!`

This is a basic use case of query parameters and default values in Node.js using Express.
Best for optional inputs like search filters and sorting options.


---

## 📦 2. Route Parameters
Route parameters are part of the URL path and defined with Colon (`:`) in routes.

**Example URL**

```JS
http://localhost:3000/student/51
```

**Code:**
```js
app.get('/student/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is ${userId}`);
});
```
**Explanation**

- `app.get('/user/:id', ...)`: Defines a GET endpoint where `:id` is a **route parameter**.
- `req.params.id`: Retrieves the value of the `id` parameter from the URL.
- Route parameters are dynamic segments in the URL path and are commonly used to identify resources.
- Route parameters are dynamic segments in the URL path.
- Define with `:paramName` and access via `req.params`.

This pattern is often used to fetch or manipulate a specific resource using its `identifier`.
For Example GET the details of the `Student` with `RollNumber` - `51`. Then the URL will be http://localhost:3000/student/51

---

## 🧾 3. Request Body
In Express.js, the **request body** (`req.body`) contains data sent by the client in POST, PUT, or PATCH requests. This is typically used when submitting forms or sending JSON data via an API.

---

### 🔧 Enabling Request Body Parsing

To access `req.body`, you need to use middleware to parse incoming request data.

**For JSON data:**
```js
app.use(express.json());
```

**For URL-encoded form data:**
```js
app.use(express.urlencoded({ extended: true }));
```

---
**Example: Handling a Login Request**

```js
// Middleware to parse JSON
app.use(express.json());

app.post('/login', (req, res) => {
    console.log(req.body); // { username: "John", password: "1234" }

    res.send(`Welcome, ${req.body.username}`);
});
```

**Example: POST Request:**
```
POST /login
Content-Type: application/json

{
  "username": "John",
  "password": "1234"
}
```

**📘 Explanation**

- `req.body` contains the parsed body of the request.
- It is `undefined` by default — must use middleware like `express.json()` to populate it.
- You can destructure it or access fields directly: `req.body.username`, `req.body.password`.

### 🔄 Summary

| Request Type       | Middleware             | `req.body` Available |
| ------------------ | ---------------------- | -------------------- |
| JSON               | `express.json()`       | ✅                    |
| Form (URL-encoded) | `express.urlencoded()` | ✅                    |
| Raw/Binary         | Custom parser          | Depends              |

---


## 🧾 4. Headers
Request headers are metadata passed along with HTTP requests. They contain information like browser type, authentication tokens, content types, and more.

In Express.js, you can access headers via the `req.headers` object.

---
**🔍 Accessing Headers**

```js
app.get('/headers', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`User-Agent: ${userAgent}`);
});
```

**Sample Request:**
```http
GET /headers
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

---

**📘 Explanation**

- `req.headers` is an object where each key is the header name in lowercase.
- You can access headers using bracket notation like `req.headers['user-agent']`.

**Example: Accessing a Custom Header**

```js
app.get('/custom-header', (req, res) => {
    const clientType = req.headers['x-client-type'];
    res.send(`Client Type: ${clientType}`);
});
```

**Sample Request with Custom Header:**
```http
GET /custom-header
x-client-type: mobile
```

**Response:**
```
Client Type: mobile
```

---

**⚠️ Note**

- Header names are **case-insensitive**, but it's best to use lowercase when accessing them in Node.js.
- You can also use headers to pass tokens for authentication (`Authorization` header).

---

**Use Cases for Headers**

| Header             | Purpose                                |
|--------------------|----------------------------------------|
| `Content-Type`     | Indicates the media type of the body   |
| `User-Agent`       | Identifies the client software         |
| `Authorization`    | Contains credentials (e.g., tokens)    |
| `X-Custom-Header`  | Any custom client-to-server info       |

---


## 🍪 5. Cookies

**Code (requires cookie-parser):**
```bash
npm install cookie-parser
```

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/cookie', (req, res) => {
    const token = req.cookies.token;
    res.send(`Token: ${token}`);
});
```

**Explanation:**
- Cookies are stored in the browser and sent with each request.
- Use `cookie-parser` middleware to access them via `req.cookies`.

---

## ✅ Summary

| Type             | Access via    | Middleware Required |
| ---------------- | ------------- | ------------------- |
| Query Parameters | `req.query`   | ❌                   |
| Route Parameters | `req.params`  | ❌                   |
| Request Body     | `req.body`    | ✅ `express.json()`  |
| Headers          | `req.headers` | ❌                   |
| Cookies          | `req.cookies` | ✅ `cookie-parser`   |

