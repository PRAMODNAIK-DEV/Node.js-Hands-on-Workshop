const express = require('express');
const pool = require('./db');
const { getUsers, createUser } = require('./simple-routes/users');
const { createProduct, getProducts, deleteProductById, updateProductById } = require('./simple-routes/products');
const { getOrders, createOrder } = require('./simple-routes/orders');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to My College");
});

app.get('/users', getUsers);
app.post('/users', createUser);


// Create product
app.post('/products', createProduct);

// Read all products
app.get('/products', getProducts);

// Update product
app.put('/products/:id', updateProductById);

// Delete product
app.delete('/products/:id', deleteProductById);

// Place order
app.post('/orders', createOrder);

// Get all orders
app.get('/orders', getOrders);


app.listen(3000, () => {
    console.log("Server is Running at http://localhost:3000");
});