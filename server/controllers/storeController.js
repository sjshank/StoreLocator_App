/*
*	module for calculating distance between 2 geo-location and retreive all stores based on zipcode
*/
'use strict';
const storeModels = require("../models/store"),
    log4js = require('log4js'),
    log = log4js.getLogger("storeController"),
    limit = 50;

//Retrieve all the stores based on user entered zipcode
exports.getStores = function(reqObject, resOject) {
    try{
            var lat = reqObject.body.loc.lat,
                long = reqObject.body.loc.lng;
            
            storeModels.find({}, function(err, stores) {
                if (err) {
                    log.error(err);
                    console.log(err);
                } else {
                        var result = stores.filter(function(store) {
                            var c = calDistance(store.location.lat, store.location.long, lat, long, 'K');
                            if (limit >= c) {
                                return true;
                            } else {
                                return false;
                            }
                    });

                    return resOject.json({ response: result });
                }
            });
    }catch(err){
        log.error("Error occurred while retreiving stores from mongodb", err);
    }
};

//Calculate distance between 2 geo-location
function calDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
};