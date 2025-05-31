const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticate } = require('../middleware/authMiddleware');
const Products = require('../models/products');         // Import the Products Model

// Create product
router.post('/', authenticate, async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        //PostgreSQL
        // const result = await pool.query(
        //     'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        //     [name, description, price, stock]
        // );
        // res.status(201).json(result.rows[0]);

        // MongoDB
        const product = new Products({ name, description, price, stock });
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});

// Read all products
router.get('/', authenticate, async (req, res) => {
    // const result = await pool.query('SELECT * FROM products');
    // res.json(result.rows);

    // MongoDB
    try {
        const products = await Products.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Products' });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const { id } = req.params;

    // PostgreSQL
    // try {
    //     const result = await pool.query(
    //         'UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5 RETURNING *',
    //         [name, description, price, stock, id]
    //     );
    //     res.json(result.rows[0]);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Error updating product");
    // }

    // MongoDB
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { name, description, price, stock },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating product');
    }

});

// Delete product
router.delete('/:id', async (req, res) => {

    // PostgreSQL
    // try {
    //     await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    //     res.send("Product deleted");
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Error deleting product");
    // }

    // MongoDB
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.send('Product deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

module.exports = router;