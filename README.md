# 🚀 Node.js-Hands-on-Workshop 2025

Welcome to the official repository for the **3-Day Node.js REST API Workshop**. This hands-on program is tailored for beginner to intermediate developers aiming to build real-world backend applications using Node.js, Express.js, MongoDB, and PostgreSQL. From core concepts to deployment, this workshop offers a structured, practical approach to mastering backend fundamentals.

---

## 📅 Workshop Schedule (3 Days)

### 🟩 **Day 1 – Node.js Fundamentals & HTTP Module**
**Topics Covered:**
- What is Node.js and how it works
- Core modules: `fs`, `path`, `events`, `http`
- Creating a basic HTTP server
- File system operations
- Routing with native Node.js
- Simple CLI-based tools

**Hands-On:**
- Build a simple HTTP-based Note Saver app
- CLI task manager (file storage)

📂 Folder: `01-foundation-node-http/`

---

### 🟨 **Day 2 – Express.js & REST API Development**
**Topics Covered:**
- Introduction to Express.js
- API Routing & Controllers
- Middleware (custom & third-party)
- Error handling, validation (`express-validator`)
- File upload using `multer`

**Hands-On:**
- Build a RESTful API for task management
- Serve static files
- Implement middleware chains

📂 Folder: `02-building-rest-with-express/`

---

### 🟥 **Day 3 – MongoDB & PostgreSQL Integration + Deployment**
**Topics Covered:**
- NoSQL vs SQL: When to use which
- MongoDB + Mongoose (schema, models, connection)
- PostgreSQL with `pg` or Sequelize
- CRUD operations with both DBs
- Environment configuration with `.env`
- Deployment using Render or Railway
- Git & GitHub basics

**Hands-On:**
- Create two versions of the same API (MongoDB & PostgreSQL)
- Deploy one API to Render/Railway
- Secure your app with `helmet`, `cors`, and `.env`

📂 Folder: `03-data-persistence-and-deployment/`

---

## 🛠️ Project Structure

```bash
nodejs-api-workshop-2025/
├── README.md
├── 01-foundation-node-http/
├── 02-building-rest-with-express/
├── 03-data-persistence-and-deployment/
│   ├── mongodb-version/
│   └── postgresql-version/
├── public/
└── .env.example
