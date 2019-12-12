
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

module.exports = showController;