var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CaseSchema = new Schema({
	id : {
		type: Number,
		default: 0
	},
	imgPath:String,
	title:String,
	txt:String,
	publish:{
		type:Date,
		default:Date.now
	}
});

var cids = mongoose.model('cid');
var News = mongoose.model('news', CaseSchema, 'news');

//使用findByIdAndUpdate进行ID自增，将返回值重新插入留言表里
CaseSchema.pre('save', function (next) {
	var doc = this;
	cids.findByIdAndUpdate({_id: 'CasesId'}, {$inc: {id: 1}},
	function (error, comment) {
		if (error) return next(error);
		doc.id = comment.id; //将返回值插入留言表ID
		next();
	});
});

module.exports = News;