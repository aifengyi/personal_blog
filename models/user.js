'use strict'
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const userSchema = mongoose.Schema({
	uid:Number,
	name:String, 
	email:String, 
	pwd:String,
	signature:String,
	intro:String,
	photo:String,
	locate:String,
	originphoto:String,
	logintype:Number,
	access_token:String,
	oid:String,
	gender:{ type: Number, default: -1 },
	score:Number,
	//articles:[{type:Schema.Types.ObjectId,ref:'Article'}],
	create_at:{ type: Date, default: Date.now },
    admin:{ type: Number, default: 0 },
	isvalid:{ type: Number, default: -1 }
});
module.exports = mongoose.model('User', userSchema);