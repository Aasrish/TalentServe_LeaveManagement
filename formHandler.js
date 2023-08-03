const express = require('express');
const router = express.Router();
const pool = require('./connection');
const bcrypt = require('bcrypt');

router.post('/submit-form', async (req, res) => {
  const { name, email, employeeID, password, role } = req.body;

  // Perform any data validation if required

  try {
    // Insert the data into the database
    const hashedPassword = await bcrypt.hash(password, 10); 
    const query = 'INSERT INTO employee (Name, Email, EmployeeID, Password, role) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, employeeID, hashedPassword, role];

    const [result] = await pool.execute(query, values);

    console.log('Data inserted successfully!', result);
    res.sendFile(__dirname + '/login.html');
  } catch (err) {
    console.error('Error inserting data into the database:', err);
    res.send('Error inserting data into the database. Please try again.');
  }
});

router.post('/login', async (req, res) => {
  const { employeeID, password } = req.body;

  try {
    // Retrieve user data from the database based on the email
    const query = 'SELECT * FROM employee WHERE EmployeeID = ?';
    const [rows] = await pool.execute(query, [employeeID]);

    if (rows.length === 0) {
      return res.send('User not found.'); // User not found in the database
    }

    // Compare hashed password from the database with the provided password
    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.Password);

    if (isPasswordMatch) {
      // Passwords match, user is authenticated
      return res.sendFile(__dirname + '/welcome.html');
    } else {
      return res.send('Invalid password.'); // Incorrect password
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.send('Error during login. Please try again.');
  }
});

module.exports = router;
