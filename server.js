const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'craft_haven'
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sign-up endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Perform sign-up process (validate inputs, create user, etc.)
  // Here, you would insert the user data into the database
  pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error signing up.');
      return;
    }
    res.status(200).send('Signed up successfully.');
  });
});

// Sign-in endpoint
app.post('/signin', (req, res) => {
  const { usernameOrEmail, password } = req.body;
  // Perform sign-in process (validate inputs, authenticate user, etc.)
  // Here, you would query the database to find the user by username or email
  pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error signing in.');
      return;
    }
    if (results.length === 0 || results[0].password !== password) {
      res.status(401).send('Invalid username/email or password.');
      return;
    }
    res.status(200).send('Signed in successfully.');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
