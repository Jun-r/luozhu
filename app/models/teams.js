var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	id: {
		type: Number,
		default: 0
	},
	categoryId:Number,
	imgPath:String,
	intro:String,
	name:String,
	job:String
});

var cids = mongoose.model('cid');
var Teams = mongoose.model('teams', TeamSchema, 'teams');

//使用findByIdAndUpdate进行ID自增，将返回值重新插入留言表里
TeamSchema.pre('save', function (next) {
	var doc = this;
	cids.findByIdAndUpdate({_id: 'CasesId'}, {$inc:{id:1}},
	function (error, comment) {
		if (error) return next(error);
		doc.teams.id = comment.id; //将返回值插入留言表ID
		next();
	});
});

module.exports = Teams;