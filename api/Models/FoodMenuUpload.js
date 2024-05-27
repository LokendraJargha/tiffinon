const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodMenuUpload = new Schema({
  kitchen: {
    type: Schema.Types.ObjectId,
    ref: 'Kitchen',
  },
  upload: {
    type: Schema.Types.ObjectId,
    ref: 'Upload',
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

module.exports = mongoose.model('Food_Menu_Uploads', FoodMenuUpload);
