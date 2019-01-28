var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var JSONStream = require('JSONStream');
var omit = require('lodash/omit');

/* GET all companies */
router.get('/', function(req, res) {
    var fields = omit(req.query, ["long", "lat", "range"]);
    Company.find({geometry: {
            $near: {
                $geometry: {
                    type: 'Point' ,
                    coordinates: [req.query.long,req.query.lat]
                },
                $maxDistance: req.query.range
            }
        },
        ...fields
    })
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'))
});

router.get('/:attribute', function(req, res) {
    Company.distinct(req.params.attribute, function(err, values) {
        if (err)
            res.send(err);

        res.json(values);
    })
});

module.exports = router;