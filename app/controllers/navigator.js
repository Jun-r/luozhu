var Navigator = require("../models/navigator");
//导航列表
exports.list = function (req,res) {
	Navigator.find({}, function (err, navigators) {
		res.render("admin/navigatorList", {
			navigators: navigators,
			title: "导航列表"
		});
	})
}

//添加导航
exports.add = function (req, res) {
	Navigator.find({}, function (err, navigators) {
		res.render("admin/navigatorAdd", {
			navigators: navigators,
			title: "添加导航"
		});
	});
}

//编辑导航
exports.update = function (req, res) {
	var id = req.params.id;
	Navigator.findById({
		_id: id
	}, function (err, navigator) {
		console.log(navigator);
		res.render("admin/navigatorUpdate", {
			navigator: navigator,
			title: "编辑导航"
		});
	});
}

//获取所有导航
exports.getAllnav = function (callback) {
	Navigator.find().sort({
		sort: 1
	}).exec(function (err, navigator) {
		if (err) {
			return callback(err)
		} else {
			return callback(null, navigator)
		}
	});
}

//更新、添加
exports.save = function (req, res) {
	var _navigator = req.body;
	var id = _navigator._id;
	if (id) {
		Navigator.update({
			_id: id
		}, _navigator, function (err, _navigator) {
			res.redirect("/admin/navigatorList");
		});
	} else {
		delete _navigator._id
		Navigator.create(_navigator, function (err, navigator) {
			res.redirect("/admin/navigatorList");
		});
	}
}

exports.delete = function (req, res) {
	var id = req.params.id;
	Navigator.remove({
		_id: id
	}, function (err, navigator) {
		res.redirect("/admin/navigatorList");
	})
}