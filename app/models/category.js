var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleCategorySchema = new Schema({
    //分类名称
    CateName: {type: String},
    //分类别名
    Alias: {type: String},
    //链接地址
    Link: {type: String}
});

var ArticleCategory = mongoose.model('category',ArticleCategorySchema,'category');

module.exports = ArticleCategory;