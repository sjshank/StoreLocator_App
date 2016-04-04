const db = require("../config/db"),
	Schema = db.Schema;

var storeModel = new Schema({
	name : {type: String, default: "Paradise Biryani"},
	address : {
        street : {type: String},
        city : {type: String},
        state : {type: String},
        country : {type: String},
        zipcode : {type: String}
    },
    location : {
        lat : {type: Number},
        long : {type: Number}
    }
});

var store = db.model('storeModels', storeModel);

module.exports = store;
