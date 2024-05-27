const mongoose = require('mongoose');
const { Schema } = mongoose;

const Admin = new Schema({
  name: String,
  email: String,
  password: String,
  phone_number: String,
  last_active: {
    type: Date,
    default: Date.now,
  },
  // role_id: {type: Schema.Types.ObjectId, ref:'roles'},
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  parent_id: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model('Admin', Admin);
