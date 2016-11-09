var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var NavigatorSchema = new Schema({
    name:String,
    sort:Number,
    remark:String,
    url:String
});

module.exports = NavigatorSchema;