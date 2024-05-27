const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderStatus = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
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

module.exports = mongoose.model('Order_Status', OrderStatus);
