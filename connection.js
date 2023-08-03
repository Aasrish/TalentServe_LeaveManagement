const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Replace with your MySQL host address
  port: 3306,
  user: 'root',
  password: 'Pav@050403',
  database: 'my_login_test',
  waitForConnections: true,
  connectionLimit: 100, // Adjust as needed based on your application's needs
  queueLimit: 0
});

// Export the pool to use it in other files
module.exports = pool.promise();