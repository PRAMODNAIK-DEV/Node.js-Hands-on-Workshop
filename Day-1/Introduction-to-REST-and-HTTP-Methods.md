# 🌐 Introduction to REST and HTTP Methods in Node.js

## 🟢 Node.js — More Than Just Backend!

While **Node.js** is a versatile platform capable of handling various kinds of applications like
- Command Line Interfaces (CLI)
- Real-time applications (e.g., chat apps)
- Task automation scripts
- Desktop applications (with Electron) etc.

But, it is **primarily used for backend development** due to its non-blocking, event-driven architecture and its ability to handle concurrent connections efficiently.

---



## 🔄 What is REST?

**REST** stands for **Representational State Transfer** is a web service that follows REST principles to enable communication between client and server

> REST is an architectural style for designing  **networked applications**. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol is most often used. 

![REST Model](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEhUQEhAQExAQEBATEBcREhASEBARFRcWFhUVGBMYHSghGBwmGxUVITEhJSkrLjAuFyEzODMsOCgtLjcBCgoKDg0OGhAQGzAmHyUwNy0rLTctKy83LisrKy83LS0tLSsyNy03MC0tLS0tLy0tLS0tKysrNy0tNy0tMi0tLf/AABEIAJUBUgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECAwUHBAj/xABHEAACAgECAwUDCQQHBQkAAAABAgADEQQSEyExBQYiQVEUUpEyVGFxgZKTodEXsdLwBxUWIzNTcjRis8HhJDVCQ3SCg6Oy/8QAGQEBAQADAQAAAAAAAAAAAAAAAAECAwQF/8QALxEBAAEDAgMFBgcAAAAAAAAAAAECESEDEgQiMQUTQWGBFCNxkaGxMlFScsHR4f/aAAwDAQACEQMRAD8A7ZERMmJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQIB25301FOtt0yezsK7tHXXSa7jqNRxgpfY6naCuSeYl/ZHevV223ACphS+uVKl0upU28DeKx7WW4SkkLnP0ySazu1prGsd0bfdZp7XYO6sLNPyqZSD4SPo65OZ56e52kVnYC8rcbzbW2p1B01nHDCzdRu2HO8+Xp6SjTdg94ddqEtXfo01FdddpSzT6yq2rOd6NRYRvXlgWK2M55dJuO5/at9+kTWalqAt1S3IKkdOGmCWDFmO4/SMTP2P3X0umLNUtpZ6xUWtvuuZaRnFamxjtUZ6CZ07CoGk9gCsNNwTTtDvu4RGCN+c9OWcwIZ2f3/AL30usuKUC2jTLq9Kq7iGocsFWwbs7wVGRy+UJk7O776h2VB7Nch1uio49C2il1vVzYihmPjTaOYJHPpJFqe5mgcEezqgOnfTNwia99L7dyttxuPhXmeYmz1vZdVoqDgkae2u2rDEYsryFJx16nkYEW7T78HTa7U0Xovs1OnD1MoPEa/hC3hHngllD45D5PnMHZHf5/Z0fUaax9TjVvemlVAtFOmsNbueI46HyBJODykl1ndnS22NbZVuey3TXNlmxxNPkVEDPLAJBHmCczyanuToXUKa7AA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)

---
RESTful services use standard **HTTP methods** to perform CRUD (Create, Read, Update, Delete) operations:

| Method | Action         | Description                      |
|--------|----------------|----------------------------------|
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
- REST fits well with JSON, which is the native data format for JavaScript.

---

## 🧪 Example Resource URIs

| URI              | Method | Action              |
|------------------|--------|---------------------|
| `/users`         | GET    | Get all users       |
| `/users/:id`     | GET    | Get one user        |
| `/users`         | POST   | Create new user     |
| `/users/:id`     | PUT    | Update user         |
| `/users/:id`     | DELETE | Delete user         |

---

## ✅ Summary

- REST is a **convention**, not a strict rule.
- Node.js is a perfect choice for creating RESTful APIs.
- Knowing HTTP methods is essential for building full-stack apps.

Stay tuned for the practical hands-on: **Implementing REST routes using Node.js HTTP module**!
