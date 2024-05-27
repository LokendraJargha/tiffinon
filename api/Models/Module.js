const mongoose = require('mongoose');
const {Schema} = mongoose;

const Module = new Schema({
	name: String,
    path: String,
});

module.exports = mongoose.model('modules',Module);