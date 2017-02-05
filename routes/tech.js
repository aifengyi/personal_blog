const Post = require('../models/post');
const moment = require('moment');
const config = require('../config');
const markdown = require('markdown').markdown;

const techNonMarkdown = (req, res)=>{
	let p = req.query.p;
	let postLimit = config.techPostLimitPerpage;
	Post.find({}).sort({'create_at': -1}).skip(postLimit*(p-1)).limit(postLimit).exec((err, posts)=>{
		if (err) res.send(err);
		if (!posts[0]) {
			var posts = [{title: 'No more articles...'}];
			res.render("tech.html", {
        	title: 'Tech',
        	posts: posts
        });
			return;
		}
		let time = moment(posts.create_at).format('L, h:mm');
        res.render("tech.html", {
        	title: 'Tech',
        	posts: posts,
        	time: time
        });
	});
};


const tech = (req, res)=>{
	let p = req.query.p;
	let postLimit = config.techPostLimitPerpage;
	Post.find({}).sort({'create_at': -1}).skip(postLimit*(p-1)).limit(postLimit).exec((err, posts)=>{
		if (err) throw err;
		for (let i=0; i<posts.length; i++) {
			posts[i].content = markdown.toHTML(posts[i].content);
			posts[i].time = moment(posts[i].create_at).format('ll, H:MM');
		}
		res.render("tech.html", {
            	title: 'Tech',
            	posts: posts
            });
		return;
		});
// 	Post.find({},(err, posts) => {
 //            if (err)
 //         		res.send(err);
 //         	let time = moment(posts.create_at).format('L, h:mm');
 //            res.render("tech.html", {
 //            	title: 'Tech',
 //            	posts: posts,
 //            	time: time
 //            });
 //        });
};


module.exports = {
	'GET /tech': tech,
	'GET /techNonMarkdown': techNonMarkdown
};