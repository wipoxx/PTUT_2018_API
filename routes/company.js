var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var omit = require('lodash/omit');

/* GET all companies */
router.get('/', function (req, res) {
    const fields = omit(req.query, ["long", "lat", "range"]);
    Company.find({
        geometry: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [req.query.long, req.query.lat]
                },
                $maxDistance: req.query.range
            }
        },
        ...fields
    }, function (err, values) {
        if (err)
            res.send(err);

        res.json(values);
    })
});

/* GET number of companies by activity*/
router.get('/stats/activities/', function (req, res) {
    Company.aggregate([{
        $geoNear: {
            near: {
                type: 'Point',
                coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)]
            },
            distanceField: req.query.range
        }
    },
        {
            $group: {
                _id: "$section",
                count: {
                    $sum: 1
                }
            }
        }], function (err, values) {
        if (err)
            res.send(err);

        res.json(values);
    })
});

/* Get all values of an attribute */
router.get('/:attribute', function (req, res) {
    Company.distinct(req.params.attribute, {
            geometry: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.query.long, req.query.lat]
                    },
                    $maxDistance: req.query.range
                }
            }
        } , function (err, values) {
        if (err)
            res.send(err);

        res.json(values);
    })
});

module.exports = router;