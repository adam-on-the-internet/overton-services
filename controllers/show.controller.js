
const express = require('express');
const showController = express.Router();
const {
  getAllShows
} = require("../managers/show.manager");

showController.get('/', (req, res) => {
  getAllShows()
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

showController.post('/', (req, res) => {
  const show = req.body;
  addShow(show)
    .then((show) => {
      res.send(show);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = showController;