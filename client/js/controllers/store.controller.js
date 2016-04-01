'use strict';

angular.module('storeApp')
    //controller for handling store locationsearch 
    .controller('storeCtrl', ['$scope', '$log', 'storeAPI', 'appConstants', function($scope, $log, storeAPI, appConstants) {
        $scope.store = {
            zipcode: ""
        };
        $scope.hasError = false;
        $scope.showMap = false;
        $scope.storeList = [];
        $scope.displayWarning = false;
        
        $scope.searchStore = function () {
            storeAPI.getGeolocation($scope.store).then( function(response) {
                try{
                    if(response){
                        var geoAddress = getGeoLocation(response);
                        if(geoAddress){
                            storeAPI.getStores(geoAddress).then( function(data) {
                                if(data && data.response){
                                    if(data.response.length < 1){
                                        $scope.hasError = false;
                                        $scope.displayWarning = true;
                                        $scope.errorMsg = appConstants.NO_RECORDS_FOUND;
                                    }else{
                                        $scope.hasError = false;
                                        $scope.displayWarning = false;                                        
                                    }
                                    $scope.showMap = true;
                                    $scope.storeList = data.response; 
                                    populateStores(data.response, geoAddress);
                                }
                            });
                        }else{
                            $scope.hasError = true;
                            $scope.displayWarning = false;  
                            $scope.errorMsg = appConstants.VERIFY_ZIPCODE;
                        }
                    }else{
                        $scope.hasError = true;
                        $scope.displayWarning = false;  
                        $scope.errorMsg = appConstants.SERVICE_ERROR;
                    }
                }catch(e){
                    $scope.hasError = true;
                    $scope.displayWarning = false;  
                    $scope.errorMsg = appConstants.SERVICE_ERROR;
                    $log.error("Error occurred while retreiving geo location of zipcode", e);
                }
            });
        }
    }]);
    
    //Get geolocation and address of user entered zipcode
    function getGeoLocation(data){
        if(data.length < 1){
            return false;
        }
        else {
            return  {
                        loc : data[0]['geometry']['location'],
                        formatted_address : data[0]['formatted_address']
                    };
        }   
      };
     
    //Render stores in map and higlight store address     
    function populateStores(result, geoAddress){
        var myMarkers = {
                        "markers": [
                        ]
                    };
                    for (var i = 0; i < result.length; i++) {
                        myMarkers.markers.push({
                            "latitude": result[i]['location']['lat'],
                            "longitude": result[i]['location']['long'],
                            "baloon_text": '<strong>' + result[i]['name'] + '</strong> (' + result[i]['address']['street'] + ', '
                             + result[i]['address']['city'] + ', ' + result[i]['address']['state'] + ', ' + result[i]['address']['zipcode'] + ')'
                        });
                    }
                    
                    $("#map").mapmarker({
                        zoom: 10,
                        center: geoAddress.formatted_address,
                        markers: myMarkers
                    });
    };