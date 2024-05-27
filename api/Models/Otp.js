const mongoose = require('mongoose');
const { Schema } = mongoose;

const Otp = new Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

module.exports = mongoose.model('Otp', Otp);
