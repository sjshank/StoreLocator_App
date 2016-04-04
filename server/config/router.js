/*
*	Routing configuration file
*/
'use strict';
var express = require("express"),
    storeController = require("../controllers/storeController"),
    db = require("./db");


var router = express.Router();

router.route('/store')
    .post(function(req, res) {
        storeController.getStores(req, res);
    });
    
module.exports = router;