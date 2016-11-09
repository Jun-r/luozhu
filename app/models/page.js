var mongoose = require("mongoose");
var ArticlePageSchema = require("../schemas/page");
var ArticlePage = mongoose.model('page',ArticlePageSchema,'page');
module.exports = ArticlePage;