var mongoose = require("mongoose");
var NavigateSchema = require("../schemas/navigate");
var Navigate = mongoose.model('Navigate',NavigateSchema,'navigate');
module.exports = Navigate;