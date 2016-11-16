var config = require("../../config");
var Page = require("../models/page");
var News = require("../models/news");
var cate = require("../controllers/category");
var nav = require("../controllers/navigator");
var link = require("../controllers/friendlylinks");
var Category = require("../models/category");
var async = require('async');

// 获取新闻
exports.getNews = function(callback){
	News.find().exec(function (err, news) {
		if (err) {
			return callback(err)
		} else {
			return callback(null, news)
		}
	});
}
