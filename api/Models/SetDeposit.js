const mongoose = require('mongoose');
const { Schema } = mongoose;

const SetDeposit = new Schema({
  kitchenCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen_Category',
  },
  amount: Number,
  commission_percent: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Set_Deposit', SetDeposit);
