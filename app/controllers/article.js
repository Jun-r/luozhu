var config = require("../../config");
var cate = require("../controllers/category");
var nav = require("../controllers/navigator");
var link = require("../controllers/friendlylinks");
var Article = require("../models/article");
var Navigator = require("../models/navigator");
var Category = require("../models/category");
var Page = require("../models/page");
var async = require('async');

//新闻列表
exports.list = function (req, res) {
	var pageSize = 5; //每页显示条数
	var page = req.params.num - 1 || 0;
	Article.find().count().exec(function (err, sum) {
		Article.find().limit(pageSize).skip(pageSize*page).sort({_id:-1}).exec(function (err,article) {
			Category.find({}, function (err, category) {
				res.render('admin/articleList', {
					title: '新闻列表',
					category: category,
					article: article,
					pagesize: sum
				})
			})
		});
	});
}

//添加新闻
exports.add = function (req, res) {
	Category.find({}, function (err, category) {
		res.render('admin/articleAdd', {
			title: '添加新闻',
			category: category
		})
	});
}

exports.update = function (req, res) {
	var article = req.params;
	Category.find({}, function (err, category) {
		Article.findOne({
			"_id": article.id
		}, function (err, article) {
			res.render('admin/articleUpdate', {
				title: '编辑新闻',
				category: category,
				article: article
			})
		});
	});
}

//新闻提交与更新
exports.save = function (req, res) {
	var articleC = req.body;
	var article = {
		title: articleC.title,
		alias: articleC.alias,
		remark: articleC.remark,
		categoryId: articleC.categoryId,
		'markdownContent': articleC['editormd-markdown-doc'],
	}

	if (articleC._id) {
		var id = articleC._id;
		Article.update({
			_id: id
		}, article, function (err, category) {
			res.redirect("/admin/articleList");
		});
	} else {
		Article.create(article, function (err, category) {
			res.redirect("/admin/articleList");
		});
	}

}

//获取指定列表新闻
var getCategoryIdList = function (aliasId, callback) {
	Article.find({
		"categoryId": aliasId
	}).sort({
		'_id': -1
	}).exec(function (err, articleList) {
		return callback(articleList)
	});
}

//获取指定分类新闻
var getAliasArticle = function (alias, callback) {
	Article.findOne({
		"alias": alias
	}).exec(function (err, article) {
		return callback(article)
	});
}

//获取指定新闻
var getAliasPage = function (url, callback) {
	Page.findOne({
		"url": url
	}).exec(function (err, article) {
		return callback(article)
	});
}

//获取所有新闻
var getCategoryAllList = function (callback) {
	Article.find().sort({
		'_id': -1
	}).exec(function (err, articleList) {
		return callback(articleList)
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
			getCategoryAllList(function (articleList) {
				var article = articleList;
				for (var i = 0; i < categories.length; i++) {
					var cat = categories[i];
					for (var a = 0; a < article.length; a++) {
						var art = article[a];
						if (cat['_id'] == art['categoryId']) {
							art["AliasName"] = categories[i]["Alias"];
						}
					}
				}
				res.render('article', {
					title: "全部新闻-" + config.name,
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					articleList: article,
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
				getCategoryIdList(categories[key]['_id'], function (articleList) {
					categories[key].sum = articleList.length;
				})
			}
			getCategoryIdList(cateOnes.catId, function (articleList) {
				res.render('admin/article-list', {
					title: cateOnes['name'] + "-" + config.name,
					cateOnes: cateOnes['name'],
					Alias: cateOnes['alias'],
					keywords: config.keywords,
					description: config.description,
					dirPath: config.dirname,
					categorys: categories,
					articleList: articleList,
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
		}], function (err, results) {
			var CateName,
				navigator = results[0],
				categories = results[1],
				link = results[2];
			getAliasArticle(_Alias, function (articleShow) {
				var CateName;
				if (articleShow) {
					for (var i = 0; i < categories.length; i++) {
						if (categories[i]['_id'] == articleShow.categoryId) {
							CateName = categories[i]['CateName']
							break;
						}
					}
					res.render('admin/article-detail', {
						title: articleShow.title + "-" + config.name,
						keywords: config.keywords,
						hostUrl: config.host,
						description: config.description,
						categoryName: CateName,
						dirPath: config.dirname,
						articleShow: articleShow,
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
	Article.remove({
		_id: id
	}, function (err, article) {
		res.redirect("/admin/articleList");
	})
}