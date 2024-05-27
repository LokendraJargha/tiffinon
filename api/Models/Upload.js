const mongoose = require('mongoose');
const { Schema } = mongoose;

const Upload = new Schema({
  name: String,
  save_path: String,
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
  },
  save_name: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Upload', Upload);
