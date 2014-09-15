var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
	fname : String,
	lname : String,
	address : String
});