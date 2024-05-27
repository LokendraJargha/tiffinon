const mongoose = require('mongoose');
const { Schema } = mongoose;

const Deposit = new Schema({
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
  },
  amount: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Deposit', Deposit);
