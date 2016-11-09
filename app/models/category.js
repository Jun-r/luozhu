var mongoose = require("mongoose");
var ArticleCategorySchema = require("../schemas/category");
var ArticleCategory = mongoose.model('category',ArticleCategorySchema,'category');
//var ids = new mongo.Collection(db, 'ids');
//var getNewID = function(callback){
//    ids.findAndModify({"name":'collName'}, [['name','asc']], {$inc:{'id':1}},{new:true,upsert:true},callback);
//};
module.exports = ArticleCategory;