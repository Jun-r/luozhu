var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AdminSchema = new Schema({
	username:String,
	password:String
});

AdminSchema.methods = {
	login: function (cb) {
		return this.model('Admin')
			.findOne({
				username:this.username,
				password:this.password
			})
			.populate("menus","_id name rank parent url")
			.exec(cb);
	}
};

module.exports = AdminSchema;