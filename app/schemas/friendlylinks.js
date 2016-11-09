var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Links = new Schema({
    name: {type: String},
    sort: {type: Number},
    Link: {type: String}
});

module.exports = Links;