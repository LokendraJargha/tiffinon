const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
  },
  food_menu: {
    type: Schema.Types.ObjectId,
    ref: 'Food_Menu',
  },
  longitude: String,
  latitude: String,
  phone_number: String,
  status: {
    type: String,
    default: 'Recieved',
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

module.exports = mongoose.model('Order', Order);
