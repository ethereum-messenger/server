const express = require('express');
const path = require('path');
const router = express.Router();

router.get('*', (req, res, next) => {
  if (req.originalUrl === '/bundle.js') {
    res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
  } else {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  }
});

module.exports = router;
