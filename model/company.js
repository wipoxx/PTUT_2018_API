var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CompanySchema   = new Schema({
    l1_declaree: String,
    geometry: {
        coordinates: Array
    }
});

module.exports = mongoose.model('company', CompanySchema);