'use strict'
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const postSchema = mongoose.Schema({
	title: String,
	content: String,
	category: String,
	classify: { type: String, default: 'Tech' },
	create_at: { type: Date, default: Date.now },
	update_at: Date,
	read_count: {type:Number, default: 0},
	_uid: Number
});
module.exports = mongoose.model('Post', postSchema);