var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
	username:String,
	password:String
});

AdminSchema.methods = {
	login: function (cb) {
		return this.model('admin')
			.findOne({
				username:this.username,
				password:this.password
			})
			.populate("menus","_id name rank parent url")
			.exec(cb);
	}
};

var Admin = mongoose.model('admin',AdminSchema,'admin');
module.exports = Admin;