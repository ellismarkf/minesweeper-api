const express = require('express');
const helmet = require('helmet');
const parser = require('body-parser');
const db = require('./lib/db');
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(helmet());
app.use(parser.json());

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
    res.status(500).json({
      error: err
    });
  }
});

app.post('/minefields', async (req, res) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO minefields (rows, cols, mines, name, tiles) VALUES($1, $2, $3, $4, $5)',
      [req.body.rows, req.body.cols, req.body.mines, req.body.name, `{${req.body.tiles}}`]
    )
    res.status(200).json({ message: 'POST NEW MINEFIELD' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log('Minesweeper API listening on port', PORT);
});