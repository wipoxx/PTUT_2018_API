var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CompanySchema   = new Schema({
    fields: {
        l1_normalisee: String,
        activite: String
    },
    geometry: {
        coordinates: Array
    }
});

module.exports = mongoose.model('company', CompanySchema);