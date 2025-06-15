
# Node.js Native HTTP Server – Product CRUD API
This is a Node.js server built using the native `http` module. It performs CRUD operations on products stored in a local `products.json` file.

---

## Instructions to Build and Run

### Step 1: Prerequisites
- Make sure Node.js is installed.

To verify installation:
```bash
node -v
```
This should display the specific version of `Node.js` you have installed, for example:
```bash
v22.11.0
```
---

### Step 2: Project Setup or Directly
Use the VS Code to Create the folder instead of using mkdir in Terminal

1. Create a new directory:
```bash
mkdir simple-node-server
cd simple-node-server
```

2. Create a file named `server.js`:
```bash
server.js
```

3. Create a JSON file named `products.json`:
This file containes complete data about the products.
```bash
products.js
``` 
---


### Step 3: 🛠️ Starter Code
```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && url === '/') {
        res.statusCode = 200;                         // Status Code OK
        res.end('I am Alive!');                       // End the Response with Hello, Node.js Server!
    }
  });

server.listen(port, hostname, () => {             // START the server.
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### Step 4: 🛠️ Create API Endpoints
Add Helper functions to do the CRUD with JSON File. Place the below functions on top of `http.createServer()` and after the `require`/`import` staments.

```js
// Helper to read products from the products.json
const readProducts = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write products to the products.json
const writeProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// This is to parse the request body from the Client request as it will in chunks.
// Read and parse the incoming request body (usually JSON) from an HTTP POST or PUT request.
const getRequestBody = (req) => new Promise(resolve => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(JSON.parse(body)));   // Returns the parsed JSON object via the resolved Promise.
});
```

---
### Step 5: 🛠️ Create API Endpoints
Open `server.js`and implement separate endpoints for each CRUD operation (Create, Read, Update, Delete).


### POST /products
Create a new product and store it's details inside `products.json`

```js
if (url === '/products' && method === 'POST') {
    const body = await getRequestBody(req);
    const products = readProducts();
    const newProduct = { id: Date.now().toString(), ...body };
    products.push(newProduct);
    writeProducts(products);
    res.statusCode = 201;
    res.end(JSON.stringify(newProduct));
}

```
#### Test the Endpoint in Postman: Sample Request:
- **Method:** `POST`
- **Endpoint:** `/products`
- **Body (JSON):**
```json
{
    "name": "iPhone",
    "price": 499
}
```
---
### GET /products
List all the Products from the products.json file

```js
// GET all products
if (url === '/products' && method === 'GET') {
    const products = readProducts();
    res.end(JSON.stringify(products));
}

```
#### Test the Endpoint in Postman: Sample Request:
- **Method:** `GET`
- **Endpoint:** `/products`

---

### DELETE /products
This endpoint is to delete the previously create product by using it's ID

```js
if (method === 'DELETE' && url.startsWith('/products/')) {
    const id = url.split('/')[2]; // Extract the product ID from the URL

    let products = readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        const deleted = products.splice(index, 1);
        writeProducts(products);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Product deleted', product: deleted[0] }));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Product not found' }));
    }
}
```
#### Test the Endpoint in Postman: Sample Request:
- **Method:** `DELETE`
- **Endpoint:** `/products/<ID>`
---

### Step 4: Run the Server
Use Node.js to run the app:
```bash
node server.js
```

You should see:
```
Server is running at http://localhost:3000
```

---

## Explanation

- **http.createServer()**: Creates a new HTTP server instance that listens to incoming requests.
- **req.url**: Used to determine which URL path is being accessed.
- **res.statusCode**: Sets the HTTP status code for the response.
- **res.setHeader('Content-Type', 'text/plain')**: Ensures the client interprets the response as plain text.
- **res.end()**: Sends the response body to the client and ends the request.
- **server.listen(3000)**: Tells the server to start listening for connections on port 3000.

---

**Stopping the Server**
To stop the server, press `Ctrl + C` in the terminal where it's running.

---
**Notes**
- No external packages are required.
- This is a beginner-friendly project to learn core Node.js concepts.
