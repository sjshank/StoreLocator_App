/*
*   Service for calling GET/POST call to retrieve geolocation from google api and stores from app server
*
*/

'use strict';
angular.module('storeApp')
    .factory('storeAPI', ['$q', '$http', 'URL', 'googleAPI', 'appConstants',
                 function($q, $http, url, googleAPI, appConstants) {
        
            var storeAPIObject = {};
       
            //get zipcode geolocation from google api
            storeAPIObject.getGeolocation = function(data) {
                var deferred = $q.defer();
                var u = googleAPI + '?address=' + data.zipcode;
                $http.get(u).
                    success(function(data, status, headers, config) {
                        if(data.results){
                            deferred.resolve(data.results);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
            //get list of stores from mongodb based zipcode
            storeAPIObject.getStores = function(data) {
                var deferred = $q.defer();
                $http.post(url, data).
                    success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
        return storeAPIObject;
    }]);