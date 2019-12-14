
const express = require('express');
const indexController = express.Router();

indexController.get('/', (req, res) => {
  res.send('overton services running on heroku');
});

indexController.get('/health', (req, res) => {
  res.send('UP');
});

indexController.get('/knockKnock', (req, res) => {
  res.send('WhoIsThere');
});

module.exports = indexController;