const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema({
  areaName: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: false,
  },
});

mongoose.model('text', TextSchema);