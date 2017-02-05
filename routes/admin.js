const Post = require('../models/post');
const moment = require('moment');
const config = require('../config');
const markdown = require('markdown').markdown;

const admin = (req, res)=>{
	Post.find({}).sort({'create_at': -1}).exec((err, posts)=>{
		if (err) throw err;
		for (let i=0; i<posts.length; i++) {
			posts[i].time = moment(posts[i].create_at).format('ll, H:MM');
		}
		res.render("admin.html", {
            	title: 'Tech',
            	posts: posts
            });
		return;
		});
};

module.exports = {
	'GET /admin': admin
};