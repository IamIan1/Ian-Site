const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const cors = require('cors');
const app = express();


////////////////// Contact Me Backend ///////////////////////////////
const nodemailer = require('nodemailer');

// Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Use nodemailer to send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iamian100gaming@gmail.com',
      pass: process.env.GAMING_GMAIL_PW
    }
  });

  const mailOptions = {
    from: email,
    to: 'iamian100gaming@gmail.com',
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: message not sent'+name+email+message);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent');
    }
  });
});


////////////////////// MySQL Connection ///////////////////////////
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'ian_site_schema',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database.');
});

app.get('/tables', (req, res) => {
  connection.query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "ian_site_schema"', (error, results) => {
    if (error) {
      console.error('Error getting table names:', error.message);
      res.status(500).send('Internal server error');
      return;
    }

    // Extract the table names from the result object
    const tableNames = results.map(row => row.TABLE_NAME);

    // Return the table names as a JSON response
    res.json({ tables: tableNames });

  });
});


const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
