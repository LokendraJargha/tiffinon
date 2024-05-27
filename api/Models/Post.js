const mongoose = require('mongoose');
const {Schema} = mongoose;

const Post = new Schema ({
	title: String,
	description: String,
	slug: String,
	author: {type: Schema.Types.ObjectId, ref: 'users'},
	feature_image: {type: Schema.Types.ObjectId, ref: 'Upload'},
	category:[{type: Schema.Types.ObjectId, ref: 'Category'}],
	created_at: {type : Date, default: Date.now },
	updated_at: {type: Date, default: null}
});

module.exports = mongoose.model('posts', Post);