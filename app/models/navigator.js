var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NavigatorSchema = new Schema({
    name:String,
    sort:Number,
    remark:String,
    url:String
});

var Navigator = mongoose.model('navigator',NavigatorSchema,'navigator');

module.exports = Navigator;