var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BannerSchema = new Schema({
	url:String,
	imgPath:String,
	sort:Number,
	title:String,
	subject:String
});

var Banner = mongoose.model('banner',BannerSchema,'banner');

module.exports = Banner;