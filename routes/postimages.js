'use strict'

const postimages = (req, res)=>{
	res.render('postimages', { title: 'images' });
};

const saveimages = (req, res)=>{
	res.send(req.files);
};

module.exports = {
	'GET /postimages': postimages,
	'POST /postimages': saveimages
};