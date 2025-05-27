const pool = require('../db');

const getOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching orders");
    }
}

const createOrder = async (req, res) => {
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
}

module.exports = { getOrders, createOrder }