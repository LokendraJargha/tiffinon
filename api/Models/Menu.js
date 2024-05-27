const mongoose = require('mongoose');
const { Schema } = mongoose;

const Menu = new Schema({
  parent: {
    type: Number,
    default: 0,
    ref: 'Menu',
  },
  name: String,
  // ingredient: [
  //   {
  //     type: String,
  //   },
  // ],
  ingredients: String,
  minimum_price: Number,
  maximum_price: Number,
  is_active: {
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

module.exports = mongoose.model('Menu', Menu);
