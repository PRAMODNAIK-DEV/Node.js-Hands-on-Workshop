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

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});