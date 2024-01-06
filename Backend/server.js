const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: 'http://192.168.180.126:9000',
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));


app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'copcheckpolice',
});




app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

const port = 9000;
const ip = '192.168.180.126';

app.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
    console.log('Connected to the database');
  });
  
