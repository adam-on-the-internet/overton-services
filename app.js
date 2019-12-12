const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('overton services running on heroku');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
