const express = require('express');
const mongoose = require('mongoose');

// bring in controllers
const showController = require('./controllers/show.controller');

const app = express();

// DB setup
const db = require('./config/database.config');
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
})
.then(() => {
  logInfo("mongodb connected...");
})
.catch((err) => {
  logError(err);
});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', ['Authorization', 'Content-Type']);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
}
app.use(allowCrossDomain);

// use controllers
app.use('/show', showController);

// naked route
app.get('/', (req, res) => {
  res.send('overton services running on heroku');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
