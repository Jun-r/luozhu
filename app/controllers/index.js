var Navigate = require("../models/navigate");
var config= require("../../config");
// index page
exports.index = function(req, res) {
    Navigate.find().sort({sort:1}).exec(function (err,navigate) {
        res.render('index', {
            title: '首页-'+config.name,
            keywords:config.keywords,
            dirPath:config.dirname,
            description:config.description,
            navigate:navigate
        })
    })
}