var mongoose = require("mongoose");
var NavigatorSchema = require("../schemas/navigator");
var Navigator = mongoose.model('Navigator',NavigatorSchema,'navigator');
module.exports = Navigator;