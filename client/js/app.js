/*
*	app.js for initializing angular module container.
*   Defining routes, value and rootscope.
*/

'use strict';

angular.module('storeApp', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller:'storeCtrl',
                templateUrl:'views/storeLocator.html'
            })
            .otherwise({
                redirectTo:'/'
            });
    }])
    
.value('URL', 'api/store')
.value('googleAPI', 'https://maps.googleapis.com/maps/api/geocode/json')
.constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
        NO_RECORDS_FOUND : "No nearby STORE X found. Please try a new search.",
        VERIFY_ZIPCODE : "Please verify and enter a valid zipcode."
})
.run(['$rootScope', function(rootScope){
    rootScope.subHeading = "A MEAN Stack based web application to find and locate STORE X on Google MAP within 50KM radius based on Zip-Code.";
    rootScope.ZIPCODE_ERR = "Zipcode should be numeric with minimum 5 and maximum 6 characters.";
}]);