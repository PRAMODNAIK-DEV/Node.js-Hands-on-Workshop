const express = require('express');
const router = express.Router();
const pool = require('../db');
const Orders = require('../models/orders');             // Import the Orders Model
const OrderItems = require('../models/order-items')      // Import the OrderItems Model
// Place order
router.post('/', async (req, res) => {
    const { user_id, items } = req.body;

    // try {
    //     let total = 0;
    //     for (let item of items) {
    //         total += item.price * item.quantity;
    //     }

    //     const orderResult = await pool.query(
    //         'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
    //         [user_id, total]
    //     );

    //     const orderId = orderResult.rows[0].id;

    //     for (let item of items) {
    //         await pool.query(
    //             'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
    //             [orderId, item.product_id, item.quantity, item.price]
    //         );
    //     }

    //     res.status(201).send("Order placed successfully");
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Error placing order");
    // }

    // MongoDB
    try {
        // Calculate total amount
        let total = 0;
        for (let item of items) {
            total += item.price * item.quantity;
        }

        // Create the order
        const newOrder = new Orders({
            user_id,
            total,
        });
        const savedOrder = await newOrder.save();

        // Create all order items and save them
        const orderItems_list = items.map((item) => ({
            order_id: savedOrder._id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
        }));

        await OrderItems.insertMany(orderItems_list);

        res.status(201).send('Order placed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error placing order');
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        // PostgreSQL
        // const result = await pool.query('SELECT * FROM orders');
        // res.json(result.rows);

        // MongoDB
        const orders = await Orders.find();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching orders");
    }
});

module.exports = router;