const express = require('express');
const textController = express.Router();
const { jwtAuthenticated } = require('../utilities/auth.util');
const textManager = require("../managers/text.manager");

textController.get('/', (req, res) => {
  textManager.getAllText()
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

textController.post('/', jwtAuthenticated, (req, res) => {
  const text = req.body;
  textManager.addText(text)
    .then((text) => {
      res.send(text);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

textController.delete('/:id', jwtAuthenticated, (req, res) => {
  const id = req.params.id;
  textManager.deleteOneText(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

textController.put('/', jwtAuthenticated, (req, res) => {
  const text = req.body;
  textManager.updateText(text)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = textController;