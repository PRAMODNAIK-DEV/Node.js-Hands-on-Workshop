const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Route imports
const userRoutes = require('./routes/users');   
const productRoutes = require('./routes/products');     
const orderRoutes = require('./routes/orders');

app.get('/', (req, res) => {
    res.send("Hello Wordl");
});

app.use('/users', userRoutes);      // This tells express to use everything exported from ./routes/users for any URL that starts with /users
app.use('/products', productRoutes);    // This tells express to use everything exported from ./routes/products for any URL that starts with /products
app.use('/orders', orderRoutes);        // This tells express to use everything exported from ./routes/orders for any URL that starts with /orders

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});