var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var FriendlyLinksSchema = new Schema({
    name: {type: String},
    sort: {type: Number},
    Link: {type: String}
});

var Links = mongoose.model('friendlylinks',FriendlyLinksSchema,'friendlylinks');
module.exports = Links;