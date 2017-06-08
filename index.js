const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(' 💣 ');
});

app.listen(process.env.PORT, () => {
  console.log('Minesweeper API listening on port', process.env.PORT);
});