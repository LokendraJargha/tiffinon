const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodMenu = new Schema({
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
  },
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
  },
  price: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Food_Menu', FoodMenu);
