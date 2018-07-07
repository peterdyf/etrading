'use strict';

var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ng-bs3-datepicker', 'ui.bootstrap']);

app.filter('calculatePL', function () {
  return function (input, cost, income, scope) {
    return (input[income] - input[cost] * scope.fxRate).toFixed(2);
  };
});


app.controller('reportCtrl',
['$scope','reportService', function ($scope, service) {
    controllerTemplate($scope, service);
    $scope.fxRate = 0.85;
    $scope.page = "reportSummary";

    $scope.search = function (from, to) {
        service.search(from, to).then(function success(response) {
            $scope.entity = response.data;
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });
    }

    $scope.getPL = function(){
        if($scope.entity){
            var income = $scope.entity.income;
            var cost = $scope.entity.cost;
            var fxRate = $scope.fxRate;
            if(income && cost && fxRate){
                return (income-cost*fxRate).toFixed(2);
            }
        }
        return 'NA';
    }

}]
);

app.service('reportService', ['$http', function($http) {
     this.search = function(from, to){
         return $http({
             method : 'GET',
             url : '/report/summary?from='+from +'&to='+to
         });
     }
 } ]);

