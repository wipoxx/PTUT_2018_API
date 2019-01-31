var express = require("express");
var router = express.Router();
var https = require("https");
var Chomage = require("../model/chomage_commune");
var Recensement = require("../model/recensement_commune");

/* GET all companies */
router.get("/chomage", function(req, res) {
	//appel api pr code postal
	const url =
		"https://api-adresse.data.gouv.fr/reverse/?lon=" +
		req.query.long +
		"&lat=" +
		req.query.lat;
	const options = {
		method: "GET",
	};
	console.log(req.query);
	const reqApi = https.request(url, options, res => {
		console.log("res");
		console.log(res);
	});
	// console.log("reqApi");
	// console.log(reqApi);

	reqApi.on("error", e => {
		console.error(e);
	});
	reqApi.end();
	//appel api pr trouver taux de chomage selon le code postal (dep)

	// Chomage.find(
	// 	{
	// 		code: 69,
	// 	},
	// 	function(err, values) {
	// 		if (err) res.send(err);
	// 		console.log(values);
	// 		res.json(values);
	// 	},
	// ).catch(err => console.log(err));
});
module.exports = router;
