const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: false,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  showStatus: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('shows', ShowSchema);