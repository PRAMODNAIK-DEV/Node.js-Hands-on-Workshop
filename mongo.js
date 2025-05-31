
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./mongodb');

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Compile schema into a model
const User = mongoose.model('User', userSchema);

const app = express();
app.use(bodyParser.json());
app.use(express.json());

connectToMongoDB();


// POST /users — create a new user
app.post('/users', async (req, res) => {
    console.log(req.body);
    
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET /users — get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


app.listen(3000, () => {
  console.log(`🚀 Server is running at http://localhost:3000`);
});

