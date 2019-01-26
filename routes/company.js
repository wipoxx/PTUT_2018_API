var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var JSONStream = require('JSONStream');

/* GET all companies */
router.get('/', function(req, res) {
    console.log(req.query);
    Company.find({geometry: {
            $near: {
                $geometry: {
                    type: 'Point' ,
                    coordinates: [req.query.long,req.query.lat]
                },
                $maxDistance: req.query.range
            }
        }
    })
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
});
module.exports = router;