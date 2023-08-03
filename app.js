const express = require('express');
const bodyParser = require('body-parser');
const formHandler = require('./formHandler');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your actual homepage file
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/welcome.html');
});
// Use the formHandler router for form submissions
app.use(formHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});