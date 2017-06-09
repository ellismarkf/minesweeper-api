const express = require('express');
const helmet = require('helmet');
const db = require('./lib/db');
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(helmet());

app.get('/', (req, res) => {
  res.send(' 💣 ');
});

app.get('/minefields', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM minefields', null);
    res.send(rows);
  }
  catch(err) {
    console.error(err);
  }
});

app.get('/minefields/:minefieldId', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM minefields WHERE id = $1', [parseInt(req.params.minefieldId)]);
    if (rows.length === 0) {
      res.status(404).json({
        error: `No minefields with ID ${req.params.minefieldId}.`
      });
    }
    res.send(rows[0]);
  }
  catch(err) {
    console.error(err);
  }
});

app.post('/minefields', (req, res) => {
  res.send('POST NEW MINEFIELD');
});

app.listen(PORT, () => {
  console.log('Minesweeper API listening on port', PORT);
});