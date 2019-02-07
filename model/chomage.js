var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ChomageSchema = new Schema({
	code: Number,
	taux: Number,
});

module.exports = mongoose.model("chomage", ChomageSchema);
