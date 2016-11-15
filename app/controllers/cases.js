var config = require("../../config");
var Cases = require("../models/cases");
var cate = require("../controllers/category");
var nav = require("../controllers/navigator");
var Page = require("../models/page");
var link = require("../controllers/friendlylinks");
var Category = require("../models/category");
var Navigator = require("../models/navigator");
var async = require('async');
//案例列表
exports.list = function (req, res) {
	var pageSize = 5; //每页显示条数
	var page = req.params.num - 1 || 0;
	Cases.find().count().exec(function (err, sum) {
		Cases.find().limit(pageSize).skip(pageSize * page).sort({_id: -1}).exec(function (err, _cases) {
			Category.find({}, function (err, _category) {
				res.render('admin/casesList', {
					title: '案例列表',
					category: _category,
					cases: _cases,
					pagesize: sum
				})
			})
		});
	});
}

//项目案例
exports.add = function (req, res) {
	Category.find({}, function (err, _category) {
		res.render('admin/casesAdd', {
			title: '添加案例',
			category: _category
		})
	});
}

exports.update = function (req, res) {
	var _cases = req.params;
	Category.find({}, function (err, _category) {
		Cases.findOne({
			"_id": _cases.id
		}, function (err, _cases) {
			res.render('admin/casesUpdate', {
				title: '编辑案例',
				category: _category,
				cases: _cases
			})
		});
	});
}

//案例提交与更新
exports.save = function (req, res) {
	var _casesC = req.body;
	var _cases = {
		title: _casesC.title,
		alias: _casesC.alias,
		remark: _casesC.remark,
		categoryId: _casesC.categoryId,
		'markdownContent': _casesC['editormd-markdown-doc'],
	}

	if (_casesC._id) {
		var id = _casesC._id;
		Cases.update({
			_id: id
		}, _cases, function (err, category) {
			res.redirect("/admin/casesList");
		});
	} else {
		Cases.create(_cases, function (err, category) {
			res.redirect("/admin/casesList");
		});
	}

}

//获取指定列表案例
var getCategoryIdList = function (aliasId, callback) {
	Cases.find({
		"categoryId": aliasId
	}).sort({
		'_id': -1
	}).exec(function (err, _casesList) {
		return callback(_casesList)
	});
}

//获取指定分类案例
var getAliasCases = function (alias, callback) {
	Cases.findOne({
		"alias": alias
	}).exec(function (err, _cases) {
		return callback(_cases)
	});
}

//获取指定案例
var getAliasPage = function (url, callback) {
	Page.findOne({
		"url": url
	}).exec(function (err, _cases) {
		return callback(_cases)
	});
}

//获取所有案例
var getCategoryAllList = function (callback) {
	Cases.find().sort({
		'_id': -1
	}).exec(function (err, _casesList) {
		return callback(_casesList)
	});
}

//前台详情列表
exports.getList = function (req, res) {
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				link = results[2];
			getCategoryAllList(function (casesList) {
				var _cases = casesList;
				for (var i = 0; i < categories.length; i++) {
					var cat = categories[i];
					for (var a = 0; a < _cases.length; a++) {
						var art = _cases[a];
						if (cat['_id'] == art['categoryId']) {
							art["AliasName"] = categories[i]["Alias"];
						}
					}
				}
				res.render('cases', {
					title: "全部案例-" + config.name,
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					casesList: _cases,
					navigator: navigator,
					friendlylinks: link
				})
			})
		})
}

exports.getCategoryList = function (req, res, next) {
	var _Alias = req.params.Alias;
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			cate.getCategoryOne(_Alias, function (err, cateOne) {
				if (err) {
					cb(err);
				} else {
					cb(null, cateOne);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				cateOnes = results[2],
				link = results[3];
			for (var key in categories) {
				getCategoryIdList(categories[key]['_id'], function (casesList) {
					categories[key].sum = casesList.length;
				})
			}
			getCategoryIdList(cateOnes.catId, function (casesList) {
				res.render('admin/casesList', {
					title: cateOnes['name'] + "-" + config.name,
					cateOnes: cateOnes['name'],
					Alias: cateOnes['alias'],
					keywords: config.keywords,
					description:config.description,
					dirPath: config.dirname,
					categorys: categories,
					casesList: casesList,
					navigator: navigator,
					friendlylinks: link
				});
			})
		})
}

//前台内容详情
exports.getShow = function (req, res) {
	var _Alias = req.params.alias;
		async.parallel([
			function (cb) {
				nav.getAllnav(function (err, navigator) {
					if (err) {
						cb(err);
					} else {
						cb(null, navigator);
					}
				})
			},
			function (cb) {
				cate.getCategoryAll(function (err, categories) {
					if (err) {
						cb(err);
					} else {
						cb(null, categories);
					}
				});
			},
			function (cb) {
				link.getLinkAll(function (err, friendLink) {
					if (err) {
						cb(err);
					} else {
						cb(null, friendLink);
					}
				})
			}],
		function (err, results) {
			var CateName,
				navigator = results[0],
				categories = results[1],
				link = results[2];
			getAliasCases(_Alias, function (_casesShow) {
				var CateName;
				if (_casesShow) {
					for (var i = 0; i < categories.length; i++) {
						if (categories[i]['_id'] == _casesShow.categoryId) {
							CateName = categories[i]['CateName']
							break;
						}
					}
					res.render('admin/cases-detail', {
						title: _casesShow.title + "-" + config.name,
						keywords: config.keywords,
						hostUrl: config.host,
						description: config.description,
						categoryName: CateName,
						dirPath: config.dirname,
						casesShow: _casesShow,
						categorys: categories,
						navigator: navigator,
						friendlylinks: link
					});
				} else {
					res.redirect("/error");
				}
			})
		})
}

//单页详情
exports.getPage = function (req, res) {
	var _url = req.params.url;
	async.parallel([
		function (cb) {
			nav.getAllnav(function (err, navigator) {
				if (err) {
					cb(err);
				} else {
					cb(null, navigator);
				}
			})
		},
		function (cb) {
			cate.getCategoryAll(function (err, categories) {
				if (err) {
					cb(err);
				} else {
					cb(null, categories);
				}
			});
		},
		function (cb) {
			link.getLinkAll(function (err, friendLink) {
				if (err) {
					cb(err);
				} else {
					cb(null, friendLink);
				}
			})
		}], function (err, results) {
			var navigator = results[0],
				categories = results[1],
				link = results[2];
			getAliasPage(_url, function (_page) {
				res.render('page', {
					title: _page.name + "-" + config.name,
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					page: _page,
					navigator: navigator,
					friendlylinks: link
				});
			});
		})
}

//提交与更新
exports.delete = function (req, res) {
	var id = req.params.id;
	Cases.remove({
		_id: id
	}, function (err, cases) {
		res.redirect("/admin/casesList");
	})
}