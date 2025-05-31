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
First, create a new file named users.js inside the models folder, and add the following code to define the User model.

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
Create a new file named products.js inside the models folder, and add the following code to define the Products model.

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
Create a new file named orders.js inside the models folder, and add the following code to define the Orders model.

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

## Step-4: Modify the Routes/Endpoints

### 1. Users Endpoint:
Now, update the `/users` route located in `routes/users.js` with the following changes:

