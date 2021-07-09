'use strict';
const path = require('path');
const express = require('express');
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const cacheOptions = {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    const hashRegExp = new RegExp('\\.[0-9a-zA-z]{8}\\.');
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (hashRegExp.test(path)) {
      res.setHeader('Cache-Control', 'max-age=31536000');
    }
  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(express.static('public', cacheOptions));
app.use(express.static('tictactoe', cacheOptions));
app.use(express.static('minesweeper/build', cacheOptions));

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
  let filePath = path.join(__dirname, 'minesweeper/build/index.html')
  res.status(200);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent: ', filePath);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Games Server listening on port ${PORT}`)
})

module.exports = app;
