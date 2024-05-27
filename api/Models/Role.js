const mongoose = require("mongoose");
const { Schema } = mongoose;

const Role = new Schema({
  name: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

module.exports = mongoose.model("Role", Role);
