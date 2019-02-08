var express = require("express");
var router = express.Router();
var https = require("https");
var Chomage = require("../model/chomage");
var Recensement = require("../model/recensement");

//Impossible de récupérer la var data , surement un probleme de fonction asyncrone
// function getCodePos(lat, long) {
// 	const path = "/reverse/?lon=" + long + "&lat=" + lat;
// 	const options = {
// 		method: "GET",
// 		host: "api-adresse.data.gouv.fr",
// 		port: 443,
// 		path: path,
// 	};

// 	const req = https.request(options, res => {
// 		res.on("data", chunk => {
// 			var data = JSON.parse(chunk).features[0].properties.postcode;
// 		});
// 	});
// 	req.on("error", function(e) {
// 		console.log("problem with request: " + e.message);
// 	});
// 	req.end();
// }
/* GET all companies */
router.get("/chomage", function(req, res) {
	const path = "/reverse/?lon=" + req.query.long + "&lat=" + req.query.lat;
	const options = {
		method: "GET",
		host: "api-adresse.data.gouv.fr",
		port: 443,
		path: path,
	};

	const reqCodePos = https.request(options, resCodePos => {
		resCodePos.on("data", chunk => {
			var codePos = JSON.parse(chunk).features[0].properties.postcode;

			Chomage.find({ code: codePos[0] + codePos[1] }, (err, values) => {
				if (err) {
					console.error(err);
				}
				res.json(values);
			}).catch(err => console.error(err));
		});
	});
	reqCodePos.on("error", function(e) {
		console.error("problem with request: " + e.message);
	});
	reqCodePos.end();
});

router.get("/recensement", (req, res) => {
	const path = "/reverse/?lon=" + req.query.long + "&lat=" + req.query.lat;
	const options = {
		method: "GET",
		host: "api-adresse.data.gouv.fr",
		port: 443,
		path: path,
	};

	const reqCodePos = https.request(options, resCodePos => {
		resCodePos.on("data", chunk => {
			var codePos = JSON.parse(chunk).features[0].properties.postcode;
			Recensement.find(
				{
					codgeo: codePos,
				},
				(err, values) => {
					if (err) {
						console.error(err);
					}
					res.json(values);
				},
			).catch(err => console.error(err));
		});
	});
	reqCodePos.on("error", function(e) {
		console.error("problem with request: " + e.message);
	});
	reqCodePos.end();
});
module.exports = router;
