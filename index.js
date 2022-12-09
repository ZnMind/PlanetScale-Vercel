require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect()
app.use(express.json())
app.use(cors());

app.get('/:year?/:split?', (req, res) => {
  const year = req.params.year;
  const split = req.params.split;
  connection.query(`select * from lcs where year = ? and split = ?`, [year, split], function (err, results, fields) {
    if (err) throw err;
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.send(results);
  })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port: ${port}`))

module.exports = app;