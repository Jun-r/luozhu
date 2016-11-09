var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticlePage = new Schema({
    //单面名称
    name: {type: String},
    //单页介绍
    remark: {type: String},
    //链接地址
    url: {type: String},
    //单页内容
    markdownContent:String,
    publish:{
        type:Date,
        default:Date.now
    }
});

module.exports = ArticlePage;