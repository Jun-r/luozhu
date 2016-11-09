var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleCategory = new Schema({
	title:String,
	remark:String,
	alias:String,
	markdownContent:String,
	htmlContent:String,
	categoryId:{
		type: String
	},
	author:{
		type:ObjectId,
		ref:'Admin'
	},
	publish:{
		type:Date,
		default:Date.now
	}
});

module.exports = ArticleCategory;