module.exports = {
	appname: "fengyiai_blog",
	port: 3000,
	database: {
		cookieSecret: "thisisasecret",
		db: "techblog",
		host: "127.0.0.1",
		port: "27017",
		username: "",
		password: ""
	},
	techPostLimitPerpage: 5,
	//该re用于检测注册的用户名，匹配4-16位的汉字，字符或者下划线
	usernameRe: /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/,
	emailRe: /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
};