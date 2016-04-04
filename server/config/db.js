/*
*	Configuring and creating mongodb connection using mongoose
*/
'use strict';
const mongoose = require("mongoose"),
	URL = "mongodb://127.0.0.1:27017/storelocator",
    log4js = require('log4js'),
	debug = require('debug')('db');
    
var log = log4js.getLogger("db");
mongoose.connect(URL, callback);

function callback(err) {
    log.debug("Mongodb connection callback");
	if(err){
		log.error("Unable to connect database " + err);
		process.exit(1);
	}else{
        console.log("Connection established !");
		log.info("Connection established !");
	}
};

module.exports = mongoose;