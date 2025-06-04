
# E-Commerce Backend Server API (`Node.js` + `Express` + `MongoDB`)

This project implements a backend API for an e-commerce application using `Node.js`, `Express`, and `MongoDB`.

## Features

- User registration with **password hashing** (bcryptjs)
- `JWT`-based authentication
- `CRUD` operations for products
- Order placement and viewing

---

## 🧱 Requirements

### Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT-based auth)
- dotenv

---

## Database Configuration (MongoDB)
### Database: `e-commerceDB` - No need to create will be created automatically
Create Schemas and Models for `Users`, `Products`, `Orders`, and `OrderItems` in respective models file inside models folder.

#### Refer: [E-Commerce-Backend-Server-with-MongoDB](E-Commerce-Backend-Server-with-MongoDB.md) to create `Schemas` and `Models` for MongoDB Mongoose
--- 

## 🔧 Environment Variables

Create a `.env` file in your root with the following:

```env
JWT_SECRET=your_jwt_secret_key
```

---

## 📂 Folder Structure

```
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
├── middleware/
│   └── authMiddleware.js
├── .env
└── package.json
```

---

## 🔐 Authentication

- **Password hashing**: Passwords are hashed using `bcryptjs` before storing.
- **Token validation**: All product and order endpoints are protected using JWT tokens.

---

## 📮 API Endpoints & Test Cases

### ✅ Users

#### POST `/users` – Register a user

- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- ✅ Should create a user with hashed password.

#### GET `/users` – List all users

- ✅ Should return an array of all users.

---

### 🔑 Login

#### POST `/login` – Login

- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- ✅ Should return JWT token on success.
- ❌ Should return 401 on invalid credentials.

---

### 📦 Products

(All endpoints require JWT in `Authorization: Bearer <token>` header)

#### POST `/products` – Add a product

- **Body**:
```json
{
  "name": "Phone",
  "description": "Smartphone",
  "price": 30000,
  "stock": 100
}
```
- ✅ Should create a new product.

#### GET `/products` – Get all products

- ✅ Should return a list of products.

#### PUT `/products/:id` – Update a product

- ✅ Should update the product fields.

#### DELETE `/products/:id` – Delete a product

- ✅ Should remove the product.

---

### 📥 Orders

#### POST `/orders` – Place an order

- **Body**:
```json
{
  "user_id": "<user_id>",
  "items": [
    {
      "product_id": "<product_id>",
      "quantity": 2,
      "price": 30000
    }
  ]
}
```
- ✅ Should create an order and order items.

#### GET `/orders` – Get all orders

- ✅ Should return a list of orders.

---

## ✅ Additional Notes

- Token validation middleware is applied to `products` and `orders` routes.
- Passwords are hashed using `bcryptjs` before storing in the DB.
- `.env` file should contain your `JWT_SECRET`.

---

## 🚀 Run the Project

```bash
node server.js
```
Or Use `nodemon`

```bash
npm install nodemon
node server.js
```
---

## 🧪 Testing
Use `Postman`:
1. `Register` a user.
2. Log`in to get JWT token.
3. Use token to access protected endpoints (products, orders).

