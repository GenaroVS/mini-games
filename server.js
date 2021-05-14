'use strict';
const path = require('path');
const express = require('express');
const compression = require('compression');
const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static('public'));
app.use(express.static('tictactoe'));
app.use(express.static('minesweeper/public'));

app.get('/tictactoe', (req, res, next) => {
  let filePath = path.join(__dirname, 'tictactoe', 'tictactoe.html')
  res.status(200);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent: ', filePath);
    }
  });
});

app.get('/minesweeper', (req, res, next) => {
  let filePath = path.join(__dirname, 'minesweeper/public/minesweeper.html')
  res.status(200);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent: ', filePath);
    }
  });
});

app.use('/api', require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`Games Server listening on port ${PORT}`)
})

module.exports = app;