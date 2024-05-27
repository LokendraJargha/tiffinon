const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phone_number: String,
  date_of_birth: Date,
  password: String,
  gender: String,
  ip_address: String,
  longitude: {
    type: String,
    default: null,
  },
  latitude: {
    type: String,
    default: null,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  address: String,
  last_active: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('User', User);
