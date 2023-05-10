const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const cors = require('cors');
const app = express();


////////////////// Contact Me Backend ///////////////////////////////
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Allow requests from only the specified origin
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'iamian100gaming@gmail.com',
        pass: process.env.GMAIL_PW
      },
    });

    const info = await transporter.sendMail({
      from: '"IanSite" iamian100gaming@gmail.com',
      to: 'iansabolik@gmail.com',
      subject: 'New message from website contact form',
      text: `${name} (${email}) says: ${message}`,
    });

    console.log('Message sent:', info.messageId);
    res.status(200).send('Message sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error0: message not sent');
  }
});



////////////////////// MySQL Connection ///////////////////////////

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
