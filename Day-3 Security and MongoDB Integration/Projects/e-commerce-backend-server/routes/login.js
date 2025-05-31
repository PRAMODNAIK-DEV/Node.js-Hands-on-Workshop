const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Users = require('../models/users');     // Import the Users Model

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  // const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  // const user = result.rows[0];
  // if (!user || !(await bcrypt.compare(password, user.password))) {
  //   return res.status(401).send('Invalid credentials');
  // }

  // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  //   expiresIn: '1h'
  // });

  // res.json({ token });

  try {
    // Find user by email
    const user = await Users.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials123');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

module.exports = router;