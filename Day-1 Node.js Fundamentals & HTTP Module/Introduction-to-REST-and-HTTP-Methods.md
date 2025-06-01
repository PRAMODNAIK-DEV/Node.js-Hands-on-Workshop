# 🌐 Introduction to REST and HTTP Methods in Node.js

## 🟢 Node.js — More Than Just Backend!

While **Node.js** is a versatile platform capable of handling various kinds of applications like
- Command Line Interfaces (CLI)
- Real-time applications (e.g., chat apps)
- Task automation scripts
- Desktop applications (with Electron) etc.

But, it is **primarily used for backend development** due to its `non-blocking`, `event-driven` architecture and its ability to **handle concurrent connections efficiently**.

---

## 🔄 What is REST?

**REST** stands for **Representational State Transfer** is a web service that follows REST principles to enable communication between client and server

> REST is an architectural style for designing  **networked applications**. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol is most often used. 

![REST Model](Images/REST%20Model.jpg)

---
RESTful services use standard **HTTP methods** to perform CRUD (Create, Read, Update, Delete) operations:

| Method | Action         | Description                      |
| ------ | -------------- | -------------------------------- |
| GET    | Read           | Fetch data from the server       |
| POST   | Create         | Send data to the server          |
| PUT    | Update         | Replace existing data            |
| PATCH  | Partial Update | Modify part of the existing data |
| DELETE | Delete         | Remove data                      |

---

## 🧠 Key REST Concepts

1. **Stateless**: Each request is independent.
2. **Resource-based**: Everything is a resource (users, files, posts).
3. **Standard HTTP methods**.
4. **URI Naming**: Resources are identified via URLs.

---

## 📦 Why Use REST in Node.js?

- Node.js excels in handling **I/O-bound operations**.
- It allows us to easily build **REST APIs** using the built-in `http` module or frameworks like **Express.js**.
- REST fits well with JSON, which is the `native data format` for JavaScript.

---

## 🧪 Example Resource URIs

| URI            | Method | Action          |
| -------------- | ------ | --------------- |
| `/student`     | GET    | Get all student |
| `/student/:id` | GET    | Get one user    |
| `/student`     | POST   | Create new user |
| `/student/:id` | PUT    | Update user     |
| `/student/:id` | DELETE | Delete user     |

---

## ✅ Summary

- REST is a **convention**, not a strict rule.
- Node.js is a perfect choice for creating RESTful APIs.
- Knowing HTTP methods is essential for building full-stack apps.

## To be continued: [Routing-with-Native-NodeJS](Routing-with-Native-NodeJS.md)
