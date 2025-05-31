# Continue.. 
# 🛒 E-commerce Backend API Project (Node.js + Express + MongoDB)
We already have a fully functional backend server for our `E-Commerce` project. Now, it's time to `migrate` the database from **PostgreSQL to MongoDB (NoSQL)**.
In this step, we will modify the existing server code to integrate and work seamlessly with MongoDB.

## Our New Folder Strucutre:
```bash
e-commerce-backend-server/
├── db.js
├── server.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── OrderItem.js
├── routes/
│   ├── users.js
│   ├── products.js
│   └── orders.js
├── controllers/
│   ├── usersController.js
│   ├── productsController.js
│   └── ordersController.js
└── package.json
```

## Step-: Install Mongoose
Open the Command Prompt and navigate to your project folder using the cd command. Then, install Mongoose by running the following command:

```js
cd e-commerce-backend-server
npm install mongoose
```

## Step-2: Create the MongoDB Connection
First, create a new file named `mongodb.js` just like we did with `db.js` for connecting to PostgreSQL in our `e-commerce app`.
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

## Step-3: Create Models
Now, we need to create models for each collection.
- This is similar to what we did with PostgreSQL, where we created tables for each entity such as Users, Products, Orders, and OrderItem.
- In `MongoDB`, we define `schemas` using `Mongoose` **to represent these collections**.

Let's create a new folder named **`models`** inside our project directory. This folder will contain all the Mongoose model files for our collections.

### 1. Create Users Model
First, create a new file named `users.js` inside the models folder, and add the following code to define the User model.

```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

```

### 2. Create Product Model
Create a new file named `products.js` inside the models folder, and add the following code to define the Products model.

```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
```

### 3. Create Orders Model
Create a new file named `orders.js` inside the models folder, and add the following code to define the Orders model.

```js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
```

#### Explanation:
`user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }`: is conceptually equivalent to a `foreign key` in SQL.
  - This line defines a **relationship between** the `Order` and `User` models in MongoDB using Mongoose.
  - 🧱 type: mongoose.Schema.Types.ObjectId
      - This means the field `user` will store a **MongoDB ObjectId**, which is how documents are uniquely identified in MongoDB.
      - In this case, it's referencing the `_id` of a **User document**.

  - 🔗 `ref: 'User'`:
    This tells Mongoose:
    - "The ObjectId stored here refers to a `document` in the **User collection**."

### 4. Create OrderItems Model
Create a new file named `order-items.js` inside the models folder, and add the following code to define the OrderItems model.

```js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('OrderItem', orderItemSchema);

```
---

## Step-5: Establish the MongoDB Connection in Server.js
In the `server.js` file, `import` the MongoDB connection function and call it before starting the server, as shown below:

```js
const connectToMongoDB = require("./mongodb");      // Add this at the top of the file

connectToMongoDB()      // Invoke it just before the app.listen()

app.listen(port, () => {
    console.log(`E-commerce API running on http://localhost:${port}`);
});
```

**Note:** Just make these two changes—
  - Import the MongoDB connection function.
  - Call the function before starting the server.
> Keep the rest of the code as it is.
---

## Step-5: Modify the Routes/Endpoints

### 1. Users Endpoint:
Now, update the `/users` route located in `routes/users.js` with the following changes:

**Note:** Please refer to the comments before making any changes.
Do not remove any existing code — simply comment it out as shown below.
```js
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
        const user = new Users({ name, email, hashedPassword });
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

```

### 2. Products Endpoint:
Now, update the `/products` route located in `routes/products.js` with the following changes:

**Create (`POST`) and Read (`GET`)**
```js
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

```
**Update (`PUT`) and Delete (`DELTE`)**
```js
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
```

### 3. Orders Endpoint:
Now, update the `/orders` route located in `routes/orders.js` with the following changes:

```js
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
```

### 4. Login and Token Generation Endpoint:
Now, update the `/login` route located in `routes/login.js` with the following changes:
```js
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
```
---