const express = require('express');
const textController = express.Router();

textController.get('/', (req, res) => {
  res.send('text controller');
});

module.exports = textController;