'use strict';

angular.module('storeApp')

//Directive for validating 
.directive("searchbox", ['$log', function ($log) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
            try{
                var NUMB_REGEXP = /^[0-9]{5,6}$/;
                ngModel.$validators.searchbox = function (val) {
                    if (typeof val === 'undefined' || val === "" || (!NUMB_REGEXP.test(val))) {
                        return false;
                    }
                    else{
                        return true;
                    }
                };
            }catch(err){
                $log.error("Error occurred while validation serachbox content", err);
            }
        }           
    };
}]);