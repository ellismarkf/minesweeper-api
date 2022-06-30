const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const parser = require('body-parser');
const db = require('./lib/db');
const app = express();

const PORT = process.env.PORT || 5000;
const corsOpts = {
  origin: [
    'http://localhost:3000',
    'https://mineswept.com',
    'https://www.mineswept.com',
    'https://mineswept.now.sh',
    'https://minesweeper-ellismarkf.vercel.app'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOpts));
app.use(helmet());
app.use(parser.json());

app.get('/', (req, res) => {
  res.send(' 💣 ');
});

app.get('/minefields', async (req, res) => {
  console.log(req)
  try {
    const client = await db.connect();
    const { rows } = await client.query('SELECT * FROM minefields', null);
    res.send(rows);
    client.release()
  }
  catch(error) {
    console.error(error);
    res.status(500).json({
      error
    });
  }
});

app.get('/minefields/:minefieldId', async (req, res) => {
  try {
    const client = await db.connect()
    const { rows } = await client.query('SELECT * FROM minefields WHERE id = $1', [parseInt(req.params.minefieldId)]);
    if (rows.length === 0) {
      res.status(404).json({
        error: `No minefields with ID ${req.params.minefieldId}.`
      });
    }
    res.send(rows[0]);
    client.release()
  }
  catch(error) {
    console.error(error);
    res.status(500).json({
      error
    });
  }
});

app.post('/minefields', async (req, res) => {
  try {
    const client = await db.connect()
    const { rows } = await db.query(
      'INSERT INTO minefields (rows, cols, mines, name, tiles) VALUES($1, $2, $3, $4, $5)',
      [req.body.rows, req.body.cols, req.body.mines, req.body.name, `{${req.body.tiles}}`]
    )
    res.status(200).json({ message: 'POST NEW MINEFIELD' });
    client.release()
  } catch(error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log('Minesweeper API listening on port', PORT);
});