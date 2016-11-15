var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//这里是新建个cid表来存储；
var cidSchema = Schema({
	_id: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		default: 0
	}
});

var CaseSchema = new Schema({
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

var cids = mongoose.model('cid', cidSchema, "cid");
var Cases = mongoose.model('cases', CaseSchema, 'cases');

//使用findByIdAndUpdate进行ID自增，将返回值重新插入留言表里
CaseSchema.pre('save', function (next) {
	var doc = this;
	cids.findByIdAndUpdate({
		_id: 'CasesId'
	}, {$inc: {id: 1}},
	function (error, comment) {
		if (error)
			return next(error);
		doc.id = comment.id; //将返回值插入留言表ID
		next();
	});
});

module.exports = Cases;