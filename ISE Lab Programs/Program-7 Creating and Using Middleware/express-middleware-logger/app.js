const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Global Custom Middleware - Logs method and URL to console and file
// This middleware will be executed for all the client request as it is Global
app.use((req, res, next) => {
  const logEntry = `[${req.method}] ${req.url}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync('requests.log', logEntry);
  next();
});

// Route-specific Middleware (Local middleware as we have to pass this to specific route)
// To make it execute we have to pass it to specific route when user invokes that route then only this middleware will execute.
const checkAuth = (req, res, next) => {
  // Dummy authentication logic
  const isAuthenticated = true; // We will make use of this in Program 8: Authentication with JWT
  if (isAuthenticated) {
    console.log('Authenticated');
    next();
  } else {
    res.status(403).send('Not Authorized');
  }
};


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Home Page!');
});

// Here I am passing checkAuth middleware to /about route
app.get('/about',checkAuth, (req, res) => {
  res.send('This is the About Page');
});


// Here I am passing checkAuth middleware to /login route
app.post('/login', checkAuth, (req, res) => {
  res.send('Login Endpoint');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});