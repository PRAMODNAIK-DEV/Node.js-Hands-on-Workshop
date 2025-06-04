
## Student Backend Server - Project Requirements: Use `Node.js` + `Express` + `PostgreSQL`
This project implements a backend API for an Student Mangagement application using `Node.js`, `Express`, and `PostgreSQL`.

### 1. Student CRUD
- **Create a new student**
- **Get all students**
- **Get a student by ID**
- **Update a student**
- **Delete a student**

### 2. Course CRUD
- **Create a new course**
- **Get all courses**
- **Get a course by ID**
- **Delete a course**

### 3. Enrollment System
- **Enroll a student in a course**
- **View all courses a student is enrolled in**
- **View all students enrolled in a course**

### 4. Authentication
- **Login (JWT + bcrypt)**

---

## 🧱 Requirements

### Technologies Used

- Node.js
- Express.js
- PostgresSQL (via pg)
- `bcryptjs` (for password hashing)
- `jsonwebtoken` (for JWT-based auth)

---

## 📂 Project Modular Folder Structure
```
student-backend-server/
├── db.js                         # Database connection setup
├── server.js                     # Entry point: initializes app, middleware, 
├── routes/                       # Express routes for handling API endpoints
│   ├── students.js               # Routes for student-related APIs
│   ├── courses.js                # Routes for course-related APIs
│   └── enrollments.js            # Routes for enrollment-related APIs
├── middlewares/                  # Middleware functions
│   └── authMiddleware.js         # Authentication/authorization logic
├── .env                          # Environment variables for configuration
└── package.json                  # Node.js project metadata and dependencies
```

---

## Database Configuration (PostgreSQL)
### Database: `student_db`
Create a new database in PostgreSQL Named `student_db` using `pgAdmin 4`

### Tables: Create the PostgreSQL `Table`
#### Table: `students`

| Column     | Type         | Constraints               |
| ---------- | ------------ | ------------------------- |
| id         | SERIAL       | PRIMARY KEY               |
| name       | VARCHAR(100) | NOT NULL                  |
| email      | VARCHAR(100) | UNIQUE NOT NULL           |
| password   | TEXT         | NOT NULL                  |
| age        | INTEGER      |                           |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### Table: `courses`
| Column      | Type         | Constraints               |
| ----------- | ------------ | ------------------------- |
| id          | SERIAL       | PRIMARY KEY               |
| title       | VARCHAR(100) | NOT NULL                  |
| description | TEXT         |                           |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

#### Table: `enrollments`
| Column      | Type      | Constraints               |
| ----------- | --------- | ------------------------- |
| id          | SERIAL    | PRIMARY KEY               |
| student_id  | INTEGER   | REFERENCES students(id)   |
| course_id   | INTEGER   | REFERENCES courses(id)    |
| enrolled_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---
## Create REST API: 
Follow the following Test Cases for the REST API Implementation using `Node.js` and `Express` and store all the data in respective tables created above inside `PostgreSQL`.

### Student Endpoints

#### POST `/students`
- ✅ Should create a student with valid `name`, `email`, `age`, and **`hashed` password using bcryptjs**

- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
Test
- Use **bcryptjs** to hash passwords before storing them in the database.
- ❌ Should fail with **duplicate email**
- ❌ Should fail with **missing required fields**

#### GET `/students`
- ✅ Should return **list of all students**

#### GET `/students/:id`
- ✅ Should return student if ID exists
- ❌ Should return 404 if student ID not found

#### PUT `/students/:id`
- **Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 21
}
```

- ✅ Should `update` student details
- ❌ Should return 404 for invalid ID

#### DELETE `/students/:id`
- ✅ Should `delete` the student
- ❌ Should return 404 for non-existent ID

---

### Course Endpoints

#### POST `/courses`
- **Body**:
```json
{
  "title": "Mathematics",
  "description": "Introduction to Algebra and Geometry"
}
```
Test
- ✅ Should create a course with valid `title` and `description`

#### GET `/courses`
- ✅ Should return **list of all courses**

#### GET `/courses/:id`
- ✅ Should return course if ID exists
- ❌ Should return 404 if course ID not found

#### DELETE `/courses/:id`
- ✅ Should delete course by ID
- ❌ Should return 404 for non-existent ID

---

### Enrollment Endpoints (Protected with JWT Token Middleware)

#### POST `/enrollments`
**Body**
```json
{
  "studentId": "student_id_here",
  "courseId": "course_id_here"
}

```
Test
- ✅ Should enroll a student into a course (requires valid JWT token)
- ❌ Should fail if student or course ID doesn't exist

#### GET `/students/:id/courses`
- ✅ Should return courses a student is enrolled in (**requires valid `JWT` `token`**)

#### GET `/courses/:id/students`
- ✅ Should return students enrolled in a course (**requires valid `JWT` `token`**)

---

### Authentication Endpoint

#### POST `/login`
- Student should pass valid `username` and `password` in the request body
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- ✅ Should return `JWT` token for valid credentials
- Protect **enrollment endpoints** with a JWT token validation middleware
- ❌ Should fail for invalid username or password

---
## 🚀 Run the Project

```bash
node server.js
```
Or Use `nodemon`

```bash
npm install nodemon
nodemon server.js
```
---

## 🧪 Testing

Use `Postman`:
1. Register a Student.
2. Login to get JWT token.
3. Use token to access protected endpoints (Enrollments).

