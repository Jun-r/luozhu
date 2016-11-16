var config = require("../../config");
var Page = require("../models/page");
var Teams = require("../models/teams");
var cate = require("../controllers/category");
var nav = require("../controllers/navigator");
var link = require("../controllers/friendlylinks");
var Category = require("../models/category");
var async = require('async');

// 获取团队成员
exports.getTeams = function(callback){
	Teams.find().exec(function (err, teams) {
		if (err) {
			return callback(err)
		} else {
			return callback(null, teams)
		}
	});
}
