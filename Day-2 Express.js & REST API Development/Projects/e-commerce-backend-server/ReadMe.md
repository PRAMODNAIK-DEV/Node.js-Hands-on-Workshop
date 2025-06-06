
# 🛒 E-commerce Backend API Project (Node.js + Express + PostgreSQL)

This project implements the **backend of a basic e-commerce platform** using Node.js, Express, and PostgreSQL. It includes `APIs` for managing `users`, `products`, and `orders` — demonstrating full `CRUD` functionality.

---

## 🧱 Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Backend  | Node.js + Express |
| Database | PostgreSQL        |
| Tools    | pgAdmin, Postman  |

---

## 🗃️ Database Schema
Create the following `tables` in **PostgreSQL** using `pgadmin`

1. `Users` Table: To store `users` details
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```
> This `users` table stores user account details with an auto-incrementing `id`, `name`, unique `email`, and `password`. All fields are required, and `emails` must be `unique`.


2. `Products` Table: To store the Products Details.
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
);

```
> This `products` table stores product details with an auto-incrementing `id`, product `name`, optional `description`, `price` (up to 10 digits, 2 decimal places), and available stock. All fields except `description` are required.


3. `Orders` Table: To store the orders Details.
```sql
-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

```
> This `orders` table records each order placed by a user. It includes an auto-incrementing `id`, a `user_id` linked to the `users table`, the total order `amount`, and the timestamp `created_at` which defaults to the current time.

4. Order Items: To store the **details of individual products** within an order. 
   For example if a user ordered 2 products then there will be 2 entries in this table with same `order_id` and diff `product_id`.

```sql
-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity INT,
    price NUMERIC(10, 2)
);
```

> This `order_items` table stores **details of individual products within an order**. Each record links to an `order_id` and a `product_id`, and includes the quantity purchased and the price per item. It supports tracking multiple products per order.

---

## 📦 Project Structure
Below is the organized folder structure for the **E-commerce Backend API** project. It separates core functionality into `modular` files and `folders` for better `maintainability` and `scalability`.

```bash
e-commerce-backend-server/
├── db.js
├── server.js
├── routes/
│   ├── users.js
│   ├── products.js
│   └── orders.js
└── controllers/
    ├── usersController.js
    ├── productsController.js
    └── ordersController.js
```
> This structure follows a modular `MVC pattern`, making the codebase `clean`, `scalable`, and `easier` to `maintain`.
---


## Create Backend - Node & Express Server

**Project Setup**
Use the below command or Directly use the VS Code to Create the `folder` instead of using `mkdir` in Terminal

**Create a new directory:**
```bash
mkdir e-commerce-backend-server
cd e-commerce-backend-server
```

**Initialize the Node.js Project**
```bash
npm init -y
```

**Install All the Dependencis**
Inside your project folder (ecommerce-backend-server) run the below command to install the dependencies.

```js
npm install express pg
```
Note: 
   - This will create a new folder named `node-modules` and a file named `package-lock.json` in the projects root folder. In this case npm downloads the `express` and `pg` packages (and **all their dependencies**) and saves them in the `node_modules` folder. 
   - `package-lock.json` - Locks the **exact versions of every installed package** and **its sub-dependencies**.
     - It **Ensures consistent installs across different environments** (e.g., teammates or servers).
     - Prevents `bugs` due to version mismatches.


**🔌 Database Connection**

Inside your project folder (ecommerce-backend-server), create a file named `db.js`. This file will configure the connection to your PostgreSQL database. Paste the following code into `db.js`:
```js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_pg_user',
    host: 'localhost',
    database: 'ecommerce',
    password: 'your_password',
    port: 5432,
});

module.exports = pool;
```
> This setup uses `pg.Pool` to **efficiently manage multiple database connections**. Remember to replace the placeholder values with your actual **PostgreSQL credentials**.
---

## 🚀 Express Setup (`app.js`)
Inside your project folder (ecommerce-backend-server), create another file named `app.js`. This file is the main **entry point** for our E-commerce Backend API. It initializes the Express server, configures `middleware`, and sets up the `routing` for different API endpoints.

```js
const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("I am Alive!");
});

// Your all other routes goes here

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});

```

Now start the server by running below command

```js
node app.js
```

If you want to use nodemon module then do the following

```js
npm install -g nodemon      // Install Nodemon
nodemon app.js              // Run the server using nodemon
```
---

**Explaination:**
  - `app.use(express.json())`: 
    - This is a `middleware` that tells Express to **automatically parse incoming JSON requests**.
    - It allows your API to `read` and `access` **data sent in the body of `POST`, `PUT`, or `PATCH` requests** (like user data or product info).
  - `/`: 
    - This is a `GET` route for the root URL. 
    - When someone opens http://localhost:3000/ in the `browser` or `Postman`, the server responds with:

    ```bash
    I am Alive!
    ```
---

# Let's Start Adding the `Endpoints`/`Routes`

## 1. 👤 USERS Endpoints:

### POST /users – Create a New User
🔧 Code:

```js
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});
```
> This endpoint handles `user registration` by accepting user data and saving it into the PostgreSQL `users` database table.

**Explaination**
  - `📥 const { name, email, password } = req.body`:  
    - Extracts name, email, and password from the request body.
    - This assumes the client is sending a JSON payload like:
    ```js
    {
    "name": "Pramod",
    "email": "pramod@example.com",
    "password": "Monday@123"
    }
    ```
  - `🛠️ await pool.query(...)`: This executes an SQL INSERT query using the PostgreSQL connection pool


### 📬 Creating a New User with Postman or Test the POST /users endpoint in Postman

### 1. Open Postman
Make sure your Express server is running (usually on `http://localhost:3000`).

**1. Create a New Request**
- Click **"New" > "HTTP Request"** or **"Create Request"**.
- Set the method to **POST**.
- In the URL field, type: `http://localhost:3000/users`

**2. Set the Headers**
Go to the **Headers** tab and set:

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

> This tells the server you're sending JSON data.

**3. Set the Request Body**
- Go to the **Body** tab.
- Choose **raw** and then **JSON** from the dropdown.
- Enter your user data, like this:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**4. Send the Request**
Click the **Send** button.

***📬 Expected Response***

If the user is successfully added to the database, you should receive:

- **Status Code:** `201 Created`
- **Body:** JSON data of the newly created user. Example:

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

### GET /users – Get all users
This route handles a GET request to the /users endpoint. It retrieves all user records from the PostgreSQL users table using a SQL query and returns the result as a JSON response.

```js
app.get('/users', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

```

### 📬 Fetching All Users with Postman
  - In Postman 
    - Change the Method to `GET`
    - In the URL field, type: `http://localhost:3000/users`
    - No `Body`/`Payload` Needed as it is GET request
    - Hit `Enter` or `Send`

### 📬 Expected Response

If the request is successful, you should receive:

- **Status Code:** `200 OK`
- **Body:** JSON array of all users in the database. 
- **Example**:

```json
[
  {
    "id": 1,
    "name": "Pramod Naik",
    "email": "pammunaik92@gmail.com",
    "password": "Monday@123"
  },
  {
    "id": 2,
    "name": "Ajay",
    "email": "ajay@example.com",
    "password": "Ajay@7878"
  }
]
```

---

## 2. 📦 PRODUCTS Endpoints:

### POST /products – `Create`/`Add` a New Product
This endpoint allows you to `add` a new `product` to the **products table in the PostgreSQL database**.
  - It expects a POST request with a `JSON` body containing:
    - `name` (text)
    - `description` (optional text)
    - `price` (numeric)
    - `stock` (integer)
  - It executes an `INSERT` SQL query using these values and returns the newly created product.
  - Response: Returns the created product with status code 201 Created.

```js
app.post('/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});
```

***Test in Postman***
  - Method: POST
  - Endpoint: /products
  - Purpose: Adds a new product to the database.
  - Request Body:
    ```js
    {
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 999.99,
    "stock": 10
    }
    ```
  - Response: Returns the newly created product with status 201 Created.

### GET /products – `Read`/`Fetch` All Products
This endpoint `retrieves` and `returns` a **list of all products stored in the database**.
  - It uses a `SELECT * FROM products` SQL query to fetch all product rows.
  - The response is an `array` of product objects in `JSON` format.

```js
app.get('/products', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
});
```
***Test in Postman***
  - Method: `GET`
  - Endpoint: `/products`
  - Purpose: Retrieves all products from the database.
  - Request Body: **Not needed** as it is GET request
  - Response: Returns an array of all product objects.


### PUT /products – Update Product by `ID`
This endpoint updates the details of an existing product by its id. This will modify the entire row, use `PATCH` if you want to modify specific columns.
  - This endpoint make use of the concept of `URL Paramter` as it takes the data from the Client in the `URL`.
  - It accepts a PUT request to `/products/:id`, where `:id` is the ID of the product to update.
  - It uses the values in the JSON body to update:
    - `name`, `description`, `price`, and `stock`.
  - The SQL query uses placeholders ($1, $2, ...) to prevent `SQL injection`.
  - Response: Returns the **updated product object**.

```js
// Update product
app.put('/products/:id', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *',
            [name, description, price, stock, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
});

```

***Test in Postman***
  - Method: PUT
  - Endpoint: /products/:id
  - Purpose: Updates the details of a specific product using its ID.
  - Request Params: `id` of the product to update.
  - Request Body:
    ```js
    {
    "name": "Updated Laptop",
    "description": "High-end gaming laptop",
    "price": 1099.99,
    "stock": 8
    }
    ```
  - Response: Returns the updated product object.


### DELETE /products – Delete Product by `ID`
This endpoint deletes a product from the database using its ID.
  - It accepts a `DELETE` request to `/products/:id`.
  - The SQL query `DELETE FROM products WHERE id = $1` removes the record.
  - Response: Returns a success message like `"Product deleted"` upon completion.

```js
app.delete('/products/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
        res.send("Product deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});
```

***Test in Postman***
  - Method: DELETE
  - Endpoint: `/products/:id`
  - Purpose: Deletes a product from the database by its ID.
  - Request Params: `id` of the product to delete.
  - Response: A plain text confirmation message (e.g., `"Product deleted"`).

---

## 3.📦 ORDERS Endpoints – Create and Fetch Orders

### POST /orders – `Create`/`Add`/`Place` an Order
This endpoint allows a user to place a new order, which includes adding an entry to both the orders table and the order_items table.

```js
app.post('/orders', async (req, res) => {
    const { user_id, items } = req.body;

    try {
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }

        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
            [user_id, total]
        );

        const orderId = orderResult.rows[0].id;

        for (let item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        res.status(201).send("Order placed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error placing order");
    }
});
```

**🛠️ What Happens:**
  - The backend calculates the `total price` of the order.
  - It `inserts` the order into the `orders` table with `user_id` and `total`.
  - It retrieves the newly created `order_id` from the database.
  - For each item in the items array:
    - It `inserts` a record into the `order_items` table with details of `product`, `quantity`, `price`, and linked `order_id`.


***Test in Postman***
  - Method: POST
  - Endpoint: /orders
  - Request Body:
    ```js
    {
    "user_id": 1,
    "items": [
        {
        "product_id": 101,
        "quantity": 2,
        "price": 299.99
        },
        {
        "product_id": 105,
        "quantity": 1,
        "price": 499.00
        }
    ]
    }
    ```
  - Response:
    - 201 Created: If the order and all items are successfully saved.
    - Message: "Order placed successfully"
  - **Note**: `user_id` & `product_id` should be present in the respective Users and Products table otherwise it will throw error.



### GET /orders - `Get`/`Fetch` All Orders
This endpoint retrieves and returns all orders stored in the database.

```js
app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching orders");
    }
});
```

***Test in Postman***
  - Method: GET
  - Endpoint: /orders
  - Query: SELECT * FROM orders
  - It fetches each order's:
    - id
    - user_id
    - total amount
    - created_at timestamp
  - Response: A JSON array of all orders.
    ```js
    [
    {
        "id": 1,
        "user_id": 1,
        "total": 1098.98,
        "created_at": "2025-05-25T10:22:00.000Z"
    },
    ...
    ]
    ```
  - Error 500: If database fetching fails.

---

# `Modular Approach`: 
Let's separates **core functionality into modular files** and folders for better `maintainability` and `scalability`.

## Controllers in Node.js:
In a Node.js & Express `controllers` are responsible for handling the **actual logic** for a route — they take the request, interact with the database or business logic, and return a response.

They separate the logic from your route definitions (server.js or routes/*.js) to keep your code `modular`, `clean`, and `maintainable`.

**🧠 In Simple Terms:**
  - Routes define `what endpoint` is called.
  - Controllers define `what happens` when it's called.

## Let's Start creating the `Controllers` for our E-Commerce Project:
**There are Two Ways to Modularize Node.js + Express Server:**
1. Without Using **Router Module**
2. With Using **Router Module**


## 1. Without Using Router Module:
This is the basic approach where all routes are written directly in server.js (or app.js). Good for small applications or quick demos.
"Without using router module" means:
 - You don't use `express.Router()`
 - You define `controller` functions (like createUser) in separate files (optional)
   - But you import those functions directly into `server.js` or `app.js` and bind them to routes manually.

**Let's organize our code by moving all controller or route-handling functions into separate files:**
Create a new folder named `simple-routes` inside the project folder and Create a file named `users.js` to move all the `controllers` or `route-handling functions` related to `users` route inside of it.

In this case, we have two routes for `users`: one to create a user and another to fetch all users. So, **Cut** the route-handling functions from `app.js`, **Paste** them into users.js, give them ***meaningful names*** like `createUser` and `getUsers`, and then export them.

You'r users.js should look like below:

```js
const pool = require('../db');

const getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

module.exports = { getUsers, createUser }
```

Now import these functions into app.js and assign them to their respective routes. In this case, pass getUsers to `app.get('/users', getUsers)` and createUser to `app.post('/users', createUser)`. 
Your app.js should look like the following:

```js
const express = require('express');
const pool = require('./db');
const { getUsers, createUser } = require('./simple-routes/users');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to My College");
});

app.get('/users', getUsers);
app.post('/users', createUser);


app.listen(3000, () => {
    console.log("Server is Running at http://localhost:3000");
});
```

Do the same for all other `endpoints` by creating dedicated files inside the `simple-routes` folder, and import them into `app.js`. In this case, create two more files `products.js` and `orders.js` and move the corresponding controller or route-handling functions into them respectively.

**Note:**
> While this approach improves code cleanliness by separating logic into different files, it does not provide the full benefits of modularity. For a better and scalable structure, we should use the `Router` Module provided by Express.
---

## 2. With Using Router Module:
  - In Express.js, the Router module is a `mini Express` application. It provides a way to **group related routes together**, making your code `modular`, `readable`, and `maintainable`.
  - This is the recommended approach for `scalable apps`. You separate routes into `modules`, and optionally `controllers` too.


**Let's start building our routes with the Express Router module for better structure and organization.**

Create a new file named `server.js` inside the project folder and Paste the below code.

```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Route imports
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/users', userRoutes);      // This tells express to use everything exported from ./routes/users for any URL that starts with /users
app.use('/products', productRoutes);    // This tells express to use everything exported from ./routes/products for any URL that starts with /products
app.use('/orders', orderRoutes);        // This tells express to use everything exported from ./routes/orders for any URL that starts with /orders


app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});
```

**Explanation:**
 - **Express Initialization**: Creates an Express application instance (app).
 - **Port Setup**: Defines the port number (`3000`) where the server will `listen` for `requests`.
 - **JSON Middleware**: `app.use(express.json())` enables the server to automatically parse JSON data sent in HTTP request bodies.

---
## Create a new folder:
First create a new folder called `routes`. We will keep all our `Controllers` code or `Business Logic` inside of this directory
```js
mkdir routes
```

## 👤 User Routes (`routes/users.js`)

Inside `routes` folder create a file named `users.js` and paste the below code.

```js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Get all users
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

module.exports = router;
```

**Explaination:**
```js
const router = express.Router();
```
  - This router is a `mini` Express app.
  - It lets you define routes (like GET, POST, PUT, PATCH, DELETE, etc.) separately from the main server.js file.
  - Helps organize code, especially in large applications.

**🧠 What app.use('/users', userRoutes) Does:**
It prefixes all the routes defined inside userRoutes (your users.js) with /users.

So:
```js
router.post('/', ...) // becomes POST /users
router.get('/', ...)  // becomes GET /users
```


---

## 📦 Product Routes (`routes/products.js`)

Inside the routes folder create one more file named `products.js` and paste the below code.

```js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create product
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});

// Read all products
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
});

// Update product
router.put('/:id', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *',
            [name, description, price, stock, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
        res.send("Product deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});

module.exports = router;
```

---

## 🧾 Orders Routes (`routes/orders.js`)
Create another file named `orders.js` inside `routes` folder and paste the below code.

```js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Place order
router.post('/', async (req, res) => {
    const { user_id, items } = req.body;

    try {
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }

        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
            [user_id, total]
        );

        const orderId = orderResult.rows[0].id;

        for (let item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        res.status(201).send("Order placed successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error placing order");
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching orders");
    }
});

module.exports = router;
```


Now start the server by running below command

```js
node server.js
```
---

## 🔐 Optional Features

- JWT-based authentication for users and admin
- Cart management system
- Email confirmation using Nodemailer
- Stripe/Razorpay integration for payments

---

## ✅ Summary

This backend project covers:

- User registration
- Product management (CRUD)
- Order creation and management
- RESTful API with PostgreSQL
- Expandable to full-stack or production use

Use Postman to test each endpoint. You can also connect a React or Angular frontend.

---
