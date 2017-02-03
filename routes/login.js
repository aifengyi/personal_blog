'use strict'
const bcrypt = require('bcrypt');
const User = require('../models/user');
const config = require('../config');
const saltRounds = 10;
function getUid () {
	let uid = 1;
	User.findOne().sort({'uid':-1}).exec((err, user)=>{
		if (err) throw err;
		if (user) {
			uid = user.uid+1;
			return uid;
		}
	});
}

var login = (req, res)=>{
	res.render('login.html', {
		title: 'login'
	});
};

var register = (req, res)=>{
	res.render('register.html', {
		title: 'register'
	});
};

var doregister = (req, res)=>{
	let name = req.body.username;
	let email = req.body.email;
	let pwd = req.body.pwd;
	let pwdRepeat = req.body.pwdRepeat;
	let usernameRe = config.usernameRe;
	let emailRe = config.emailRe;
	let errors = [];
	//ensure username is valid
	if (!usernameRe.test(name)) {
		errors.push("昵称只能是4-16位的汉字，字符或者下划线:)");
		return errors;
	}

	//ensure username is available
	//ensure email is valid 
	if (!emailRe.test(email)) {
		errors.push("请填写有效的email");
		return errors;
	}

	//ensure pwd not empty
	if (pwd.length<6) {
		errors.push("密码必须至少6位");
		return errors;
	}
	//ensure pwd equals to pwdRepeat
	if (pwd!==pwdRepeat) {
		errors.push("两次密码不一致");
		return errors;
	}

	if (errors.length!=0) {
		res.render('index.html', {
			title: register,
			errors: errors
		});
		return;
	}

	//ensure user has not registered by others
	if (false) {
		errors.push("该昵称已被占用");
		res.render('index.html', {
			title: register,
			errors: errors
		});
		return;
	}
		// bcrypt.hash(pwd, saltRounds, (err, pwdHash)=>{
		// 	if (err) throw err;
		// 	let user = new User({
		// 		uid: getUid(),
		// 		name: name,
		// 		email: email,
		// 		pwd: pwdHash
		// 	});
		// 	user.save((err, user)=>{
		// 		if (err) throw err;
		// 	});
		// 	req.flash('success_msg', '注册成功!');
		// 	res.redirect('/login');
		// }
};

var dologin = (req, res)=>{
	if (req.body.username) {
		var user = User.findOne({
			username: req.body.username
		});
		if (!q) {
			pass;//flash zhanghu bucunzai
		} else {
			if (q.password = req.body.password) {
				res.redirect('/');//session flash(login success)
			} else {
				res.redirect('login');//flash incorrect password
			}
		}
	} else {
		res.redirect('/login');//no username
	}
};

var logout = (req, res)=>{
	//delete req.cookies['connect.sid']
	res.redirect('/');
};

module.exports = {
	"GET /login": login,
	"GET /register": register,
	"POST /register": doregister,
	"POST /login": dologin,
	"POST /logout": logout
};