'use strict'
const Post = require('../models/post');

const postarticle = (req, res)=>{
	res.render('postarticle', { title: '发表文章' });
};

const savearticle = (req, res)=>{
	let title = req.body.title.trim();
	let content = req.body.content.trim();
	if (title.length<2 && content.length<10) {
		res.send('title or content is too short!');
		return;
	}
	let p = new Post({
		title: title,
		content: content,
		create_at: new Date(),
		read_count: 13,
		_uid: 1
	});
	p.save();
	res.redirect('/tech');
};

module.exports = {
	'GET /postarticle': postarticle,
	'POST /postarticle': savearticle
};