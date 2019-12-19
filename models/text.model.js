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
  isOptional: {
    type: Boolean,
    required: true,
    default: true,
  }
});

mongoose.model('text', TextSchema);