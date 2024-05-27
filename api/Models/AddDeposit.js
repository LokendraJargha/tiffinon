const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddDeposit = new Schema({
  kitchen: { type: Schema.Types.ObjectId, ref: 'kitchens' },
  food_menu: { type: Schema.Types.ObjectId, ref: 'food_menus' },
  amount: Number,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('add_deposits', AddDeposit);
