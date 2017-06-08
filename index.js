const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send(' 💣 ');
});

app.get('/minefields', (req, res) => {
  res.send('GET ALL MINEFIELDS');
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