const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');       // Import the Users Model

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Commented PostgreSQL Code
        // const result = await pool.query(
        //     'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        //     [name, email, hashedPassword]       // Change the normal password variable with hashedPassword variable
        // );

        // res.status(201).json(result.rows[0]);

        //MongoDB
        const user = new Users({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Get all users
router.get('/', async (req, res) => {

    // PostgreSQL
    // const result = await pool.query('SELECT * FROM users');
    // res.json(result.rows);

    // MongoDB
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }

});

module.exports = router;