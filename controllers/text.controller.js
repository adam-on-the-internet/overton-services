const express = require('express');
const textController = express.Router();
const { jwtAuthenticated } = require('../utilities/auth.util');
const {
  getAllText
} = require("../managers/text.manager");

textController.get('/', (req, res) => {
  getAllText()
    .then((text) => {
      res.send({
        text: text
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = textController;