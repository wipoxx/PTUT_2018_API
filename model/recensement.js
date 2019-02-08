var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecensementSchema = new Schema({
	fields: {
		sexe: String,
		age4: String,
		codgeo: String,
		population: Number,
	},
});

module.exports = mongoose.model("recensement", RecensementSchema);
