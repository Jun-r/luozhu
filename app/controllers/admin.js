var Admin = require("../models/admin");
var crypto = require("../util/crypto");
var filePath = "admin/adminManage/";
var secret = "admin";
exports.login = function (req,res) {
	var _admin = req.body;
	_admin.password =  crypto.encrypt(_admin.password,secret);
	//5ff9eae5f723a3c19c0addf3830374ae
	_admin = new Admin(_admin);
	_admin.login(function (err,admin) {
		if(admin){
			req.session.admin = admin;
			res.send({"success":true,"msg":"登录成功"});
		}else{
			res.send({"success":false,"msg":"用户密码错误"});
		}
	});
}

exports.showSignin = function(req, res) {
	res.render('admin/login', {
		title: '登录页面'
	})
}

exports.main = function (req,res) {
	var admin = req.session.admin;
	res.render("admin/main",{
		title: '后台管理系统',
		admin:admin
	});
}
exports.isLogin = function (req,res,next) {
	var admin = req.session.admin;
	if(!admin){
		return res.redirect("/admin/login");
	}
	next();
}
exports.quit = function (req,res) {
	req.session.admin = null;
	res.redirect("/admin/login");
}
