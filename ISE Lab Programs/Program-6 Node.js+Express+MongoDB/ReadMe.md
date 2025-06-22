
# Express.js + MongoDB CRUD API (Beginner-Friendly)

This is a simple REST API built using **Express.js** and **MongoDB** in a single `server.js` file.

---

## 🗃️ Step 1: MongoDB Setup

1. Install MongoDB on your system or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-hosted version.
2. Create a database named `userdb` and a collection named `users`.

---

## 🏗️ Step 2: Project Setup

### 1. Initialize the project
```bash
mkdir simple-express-mongo-crud
cd simple-express-mongo-crud
npm init -y
```

### 2. Install dependencies
```bash
npm install express mongoose
```

---


## 🚀 Step 3: Create `server.js`
Now, create a Database schema and Model using Mongoose to work with MongoDB Database.
Create a new file in the root folder named `User.js` and place the below code in it.

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
```


## Step-4: Create the MongoDB Connection
First, create a new file named `mongodb.js` just like we did with `db.js` for connecting to PostgreSQL.
Inside the `mongodb.js` file, paste the following code:

```js
const mongoose = require('mongoose');

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerceDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
    }
};

module.exports = connectToMongoDB;
```

## 🚀 Step 5: Create `server.js`

Create a file named `server.js` and paste the following code:

```js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const connectToMongoDB = require('./mongoDb');        // Import the DB Connection function.

const app = express();
const port = 3000;

// Connect to MongoDB
connectToMongoDB()

app.use(express.json());


// Create User
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = new User({ name, email });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get All Users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Update User
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

Make sure MongoDB is running locally at `mongodb://localhost:27017` or replace the URI with your Atlas URI.

---

## ✅ Step 6: Testing the API

### Test with Postman
To test the endpoint make use of PostMan API Client. To learn how to use PostMan follow this documentation: [Postman Documentation](../../Postman.md)
#### 1. Create User

#### `Method`: POST
#### `URL`: http://localhost:3000/api/users
#### `Body`: 
```js
{
    "name": "Pramod Naik",
    "email": "pramod@example.com"
}
```
#### #### `Response`: 
```js
{
    "name": "Pramod Naik",
    "email": "pramod@example.com",
    "_id": "684f0eff17abc4e41f7cc459",     // This _id and _V are generated automatically by Mongodb
    "__v": 0
}
```

#### 2. Get All Users
#### `Method`: GET
#### `URL`: http://localhost:3000/api/users
#### `Body`: Not needed as it is GET request
#### `Response`: Server returns list of all the users from the users table.

#### 3. Update User
#### `Method`: PUT
#### `URL`: http://localhost:3000/api/users/684f0eff17abc4e41f7cc459      
// Here /684f0eff17abc4e41f7cc459 is the User id which I want to update
#### `Body`: Now I want update the name so my req body look like this
```js
{
    "name": "Pramod Vishnu Naik",
    "email": "pramod@example.com"
}
```
#### `Response`: 
```js
{
    "id": 3,
    "name": "Pramod Vishnu Naik",
    "email": "pramod@example.com"
}
```

#### 4. Delete User
#### `Method`: DELETE
#### `URL`: http://localhost:3000/api/users/684f0eff17abc4e41f7cc459    	    
// /684f0eff17abc4e41f7cc459 is the ID of the user which I want to delete
#### `Body`: No Body needed
#### `Response`: 
```js
{
    "message": "User deleted successfully"
}
```

---
