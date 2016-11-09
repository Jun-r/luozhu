var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleCategory = new Schema({
    //分类名称
    CateName: {type: String},
    //分类别名
    Alias: {type: String},
    //链接地址
    Link: {type: String}
});

module.exports = ArticleCategory;