'use strict'

const index = (req, res)=>{
	res.render('index.html', { title: 'fengyiai-blog' });
};

const about = (req, res)=>{
	res.render('resume.html');
}
module.exports = {
	'GET /': index,
	'GET /index': index,
	'GET /about': about
};