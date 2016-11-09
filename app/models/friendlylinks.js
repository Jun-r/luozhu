var mongoose = require("mongoose");
var FriendlyLinksSchema = require("../schemas/friendlylinks");
var Links = mongoose.model('FriendlyLinks',FriendlyLinksSchema,'friendlylinks');
module.exports = Links;