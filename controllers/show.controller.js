
const express = require('express');
const showController = express.Router();
const { jwtAuthenticated } = require('../utilities/auth.util');
const showManager = require("../managers/show.manager");

showController.get('/', (req, res) => {
  showManager.getAllShows()
    .then((shows) => {
      res.send({
        shows: shows
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

showController.get('/:id', (req, res) => {
  const id = req.params.id;
  showManager.getOneShow(id)
    .then((show) => {
      res.send(show);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

showController.post('/', jwtAuthenticated, (req, res) => {
  const show = req.body;
  showManager.addShow(show)
    .then((show) => {
      res.send(show);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

showController.delete('/:id', jwtAuthenticated, (req, res) => {
  const id = req.params.id;
  showManager.deleteOneShow(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

showController.put('/', jwtAuthenticated, (req, res) => {
  const show = req.body;
  showManager.updateShow(show)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = showController;