# Express.js `req` (Request) Object - Handling Request Data

The `req` object in Express.js represents the HTTP request and contains all the data sent from the client to the server.
1. `Query` Parameters
2. `URL`/`Route` Parameters
3. Request `Body`
4. Headers
5. Cookies
---

## Types of Request Data: Different Ways a Client Can Send Data to the Backend Server
1. Query Parameters
2. Route/URL Parameters
3. Request Body


## 📥 1. Query Parameters

**Example URL:**
Query parameters are part of the URL and follow a <domain-name>:<port-number>/<endpoint>/`?key1=value1&key2=value2&keyn=valuen` format.

- Query parameters are `key-value` pairs in the URL after the `?`.
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
- `/greet`: `Endpoint` or `Route`
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

## 📦 2. Route/URL Parameters
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
In Express.js, the **request body** (`req.body`) contains data sent by the client in `POST`, `PUT`, or `PATCH` requests. This is typically used when **submitting forms** or **sending JSON data** via an API.

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
Request headers are `metadata` passed along with HTTP requests. They contain information like `browser type`, `authentication tokens`, `content types`, and more.

In Express.js, you can access headers via the `req.headers` object.

---
**🔍 Accessing Headers**

```js
app.get('/', (req, res) => {
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

- `req.headers` is an object where each key is the header name in `lowercase`.
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

| Header            | Purpose                              |
| ----------------- | ------------------------------------ |
| `Content-Type`    | Indicates the `media type` of the body |
| `User-Agent`      | Identifies the `client software`       |
| `Authorization`   | Contains `credentials` (e.g., tokens)  |
| `X-Custom-Header` | Any `custom client-to-server info`     |

---


## 🍪 5. Cookies
**What Are Cookies?**
Cookies are **small pieces of data stored on a user’s browser by a website**. They help in **tracking user activities**,** maintaining session information**, and **personalizing user experiences**.

**How Cookies Work?**
  - `Creation`: When a user visits a website, the server sends a `Set-Cookie` `header` in the response.
  - `Storage`: The **browser stores the cookie** and sends it with each request to the **same domain**.
  - `Retrieval`: The server reads the cookie to retrieve stored information.

## Managing and Working with Cookies in Express.js 🚀
Express.js provides built-in support for handling cookies through the `cookie-parser` middleware. 


**Step-1: Setup Express and cookie-parser**
```bash
npm install cookie-parser
```
**Use the cookie parser**
```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```
**Step-2: Setting Cookies in Express**
  - Using res.cookie(): You can set a cookie in Express using the res.cookie() method.
    
    ```js
    app.get("/set-cookie", (req, res) => {
        res.cookie("username", "PramodNaik", {
            maxAge: 86400000,     // 1 day in milliseconds
            httpOnly: true        // Cookie not accessible via JavaScript
        });

        res.send("Cookie has been set!");
    });
    ```

    **Explanation**
    - `res.cookie(name, value, options)`: Used to set a cookie in the HTTP response.
    - `username`: The name of the cookie.
    - `"PramodNaik"`: The value of the cookie.
    - `maxAge`: 86400000: The cookie will expire after 1 day (in milliseconds).
    - `httpOnly`: true: Enhances security by preventing JavaScript (on the client side) from accessing the cookie. This protects against XSS attacks.
    
    #### 🛡️ What is XSS (Cross-Site Scripting)?
        XSS (Cross-Site Scripting) is a type of security vulnerability that allows attackers to `inject malicious scripts` (usually JavaScript) into trusted websites or web applications.

  - Client Request & Server Response
    - When the client hits /set-cookie, the server responds with:
    ```JS
    Set-Cookie: username=PramodNaik; Max-Age=86400000; HttpOnly
    ```
    ```JS
    Cookie: username=PramodNaik
    ```

**Step-3: Access the Cookie Data in Node & Express**
Once a cookie is set on the client (usually via the `Set-Cookie` header in a server response), **it is automatically sent by the browser** in **every subsequent request** to the same `domain` and `path`. You can access these cookies on the server in all incoming requests using `middleware` like `cookie-parser`

```js
app.get('/dashboard', (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.send(`Welcome back, ${username}`);
    } else {
        res.send('No cookie found.');
    }
});

```
**🧠 How it Works**
  - When the client sends a request (like to /dashboard), the browser includes the cookies in the Cookie header.

  - Example request header:
    ```JS
    Cookie: username=PramodNaik
    ```
  - cookie-parser reads this header and populates req.cookies.


**Explanation:**
- Cookies are stored in the browser and sent with each request.
- Use `cookie-parser` middleware to access them via `req.cookies`.


**Step-4: Deleting Cookies in Express**
To Remove or Delete the specific cookie from the client use res.clearCookie(`<cookie-name>`).

**Code:**
```JS
app.get("/delete-cookie", (req, res) => {
    res.clearCookie("username");     // 👈 Deletes the cookie named 'username'
    res.send("Cookie deleted!");     // 👈 Sends confirmation response
});
```
  - When a user visits `/delete-cookie` route, the server will attempt to clear a cookie.
  - `res.clearCookie("username")`: Removes the cookie named username from the client.

---


## ✅ Summary

| Type             | Access via    | Middleware Required |
| ---------------- | ------------- | ------------------- |
| Query Parameters | `req.query`   | ❌                   |
| Route Parameters | `req.params`  | ❌                   |
| Request Body     | `req.body`    | ✅ `express.json()`  |
| Headers          | `req.headers` | ❌                   |
| Cookies          | `req.cookies` | ✅ `cookie-parser`   |

---

[To be continued: **Middleware**](Middleware.md)