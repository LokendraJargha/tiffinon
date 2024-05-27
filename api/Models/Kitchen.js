const mongoose = require('mongoose');
const { Schema } = mongoose;

const Kitchen = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  pan_number: String,
  phone_number: String,
  password: String,
  longitude: {
    type: String,
    default: null,
  },
  latitude: {
    type: String,
    default: null,
  },
  ip_address: String,
  is_verified: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  deliver_radius: {
    type: String,
    default: '2km',
  },
  push_notification_token: [String],
  phone_uuid: [String],
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
module.exports = mongoose.model('Kitchen', Kitchen);
