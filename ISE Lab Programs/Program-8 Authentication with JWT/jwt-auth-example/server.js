const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require("./db");
const bodyParser = require('body-parser');
var cors = require('cors');             // This is to avoid CORS error from the frontend


const PORT = 3000;
const JWT_SECRET = "PRAMOD-Secret";

const app = express();

// Third Party Middlewares
app.use(cors());
app.use(bodyParser.json());         // This is to convert the data from fronend to JSON.

app.get('/', (req, res) => {
    res.send("I am Alive!");
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password]);
  if (result.rows.length > 0) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:3000`);
});