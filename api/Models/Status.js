const mongoose = require('mongoose');
const { Schema } = mongoose;

const Status = new Schema({
  name: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Status', Status);
