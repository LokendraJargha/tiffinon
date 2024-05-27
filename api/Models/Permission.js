const mongoose = require('mongoose');
const { Schema } = mongoose;

const Permission = new Schema({
  module_id: { type: Schema.Types.ObjectId, ref: 'modules' },
  admin_id: { type: Schema.Types.ObjectId, ref: 'admins' },
  role_id: { type: Schema.Types.ObjectId, ref: 'roles' },
  read: Boolean,
  write: Boolean,
  Delete: Boolean,
  created_by: String,
  created_at: { type: Date, default: Date.now },
  updated_by: String,
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model('permissions', Permission);
