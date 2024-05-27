const mongoose = require('mongoose');
const { Schema } = mongoose;

const KitchenReview = new Schema({
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
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

module.exports = mongoose.model('Kitchen_Review', KitchenReview);
