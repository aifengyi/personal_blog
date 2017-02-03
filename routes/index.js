'use strict'

const index = (req, res)=>{
	res.render('index.html', { title: 'fengyiai-blog' });
};

module.exports = {
	'GET /': index,
	'GET /index': index
};