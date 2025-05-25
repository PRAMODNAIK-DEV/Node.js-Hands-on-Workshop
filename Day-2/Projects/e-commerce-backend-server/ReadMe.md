
# 🛒 E-commerce Backend API Project (Node.js + Express + PostgreSQL)

This project implements the backend of a basic e-commerce platform using Node.js, Express, and PostgreSQL. It includes APIs for managing users, products, and orders — demonstrating full CRUD functionality.

---

## 🧱 Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Backend  | Node.js + Express                |
| Database | PostgreSQL                       |
| Tools    | pgAdmin, Postman, JWT (optional) |

---

## 🗃️ Database Schema

1. `Users` Table: To store `users` details
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
```
> This `users` table stores user account details with an auto-incrementing `id`, `name`, unique `email`, and `password`. All fields are required, and emails must be `unique`.


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
> This `products` table stores product details with an auto-incrementing `id`, product `name`, optional `description`, `price` (up to 10 digits, 2 decimal places), and available stock. All fields except description are required.


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

4. Order Items: To store the details of individual products within an order. 
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

> This order_items table stores details of individual products within an order. Each record links to an order_id and a product_id, and includes the quantity purchased and the price per item. It supports tracking multiple products per order.

---

## 📦 Project Structure
Below is the organized folder structure for the E-commerce Backend API project. It separates core functionality into modular files and folders for better maintainability and scalability.

```
ecommerce-api/
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

**Database Connection (`db.js`)**

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

---

## 🚀 Express Setup (`server.js`)

```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Route imports
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});
```

---

## 👤 User Routes (`routes/users.js`)

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

---

## 📦 Product Routes (`routes/products.js`)

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
