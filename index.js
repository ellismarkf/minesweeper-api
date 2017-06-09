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
  const { rows } = await db.query('SELECT * FROM minefields', null);
  res.send(rows);
});

app.get('/minefields/:minefieldId', (req, res) => {
  res.send(req.params);
});

app.post('/minefields', (req, res) => {
  res.send('POST NEW MINEFIELD');
});

app.listen(PORT, () => {
  console.log('Minesweeper API listening on port', PORT);
});