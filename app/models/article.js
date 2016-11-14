var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//这里是新建个aid表来存储；
var aidSchema = Schema({
	_id: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		default: 0
	}
});

var aids = mongoose.model('aid', aidSchema, "aid");

var ArticleSchema = new Schema({
	id: {
		type: Number,
		default: 0
	},
	title: String,
	remark: String,
	alias: String,
	markdownContent: String,
	htmlContent: String,
	categoryId: {
		type: String
	},
	author: {
		type: ObjectId,
		ref: 'Admin'
	},
	publish: {
		type: Date,
		default: Date.now
	}
});

var Article = mongoose.model('article', ArticleSchema, 'article');

//使用findByIdAndUpdate进行ID自增，将返回值重新插入留言表里
ArticleSchema.pre('save', function (next) {
	var doc = this;
	aids.findByIdAndUpdate({
		_id: 'ArticleId'
	}, {
		$inc: {
			id: 1
		}
	}, function (error, comment) {
		if (error)
			return next(error);
		doc.id = comment.id; //将返回值插入留言表ID
		next();
	});
});

module.exports = Article;