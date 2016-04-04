/*
*   module for loading dummy addres objects in mongodb from address.json file
*/
const jsonfile = require("jsonfile"),
      fileName = './server/data/address.json',
      storeModels = require("../models/store"),
      log4js = require('log4js'),
      log = log4js.getLogger("loadAddress");
      
// load dummy data from address.json file and insert into mongodb
exports.load= function(req, res){
    log.debug("Load dummy address objects");
	try{
		jsonfile.readFile(fileName, function (err, fileData) {
           if(err){
               log.error("Error while reading file ", err);
           }
            if(!fileData){
	  				log.error('file contains empty data');
	  			}else{
	  				storeModels.find({}, function (err, stores) {
                          if(err){
                              log.error("Unable to retrieve store list", err);
                          }else{
                            if(stores.length <= 1){
                                storeModels.create(fileData, function (err, result) {
                                    if (err){
                                        log.error("Error while storing dummy address objects ", err);
                                    }else{
                                        log.info("Dummy address obejct load successfully");
                                    }
                                });
                            }
                         }           
                   });
               }
        });		
	}catch(e){
		log.error("Error occurred while reading file", e);
		console.log("Error occurred while reading file", e);
	}
};