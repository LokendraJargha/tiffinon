const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodReview = new Schema({
  food_menu: {
    type: Schema.Types.ObjectId,
    ref: 'Food_Menu',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  review: String,
  rating: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Food_Review', FoodReview);
