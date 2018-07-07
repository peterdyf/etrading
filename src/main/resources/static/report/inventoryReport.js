'use strict';

var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ng-bs3-datepicker', 'ui.bootstrap', 'ui.grid']);

app.filter('calculatePL', function () {
  return function (input, cost, income, scope) {
    return (input[income] - input[cost] * scope.fxRate).toFixed(2);
  };
});


app.controller('reportCtrl',
['$scope','reportService', 'uiGridConstants', function ($scope, service, uiGridConstants) {
    controllerTemplate($scope, service);
    $scope.fxRate = 0.85;
    $scope.page = "reportInventory";
    $scope.columns = [
        { field: 'name'},
        { field: 'sellQty', displayName: 'Qty'},
        { field: 'unitIncome', displayName: 'u.i ($)'},
        { field: 'totalIncome', displayName: 't.i ($)'},
        { field: 'unitCost', displayName: 'u.c (¥)'},
        { field: 'totalCost', displayName: 't.c (¥)'},
        { field: uiGridConstants.ENTITY_BINDING, displayName:'u.P/L ($)', cellFilter: 'calculatePL: "unitCost": "unitIncome": grid.appScope'},
        { field: uiGridConstants.ENTITY_BINDING, displayName:'t.P/L ($)', cellFilter: 'calculatePL: "totalCost": "totalIncome": grid.appScope'}

    ];

    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: $scope.columns,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.$watch('entities', function() {
        $scope.gridOptions.data = $scope.entities;
    });

    $scope.search = function (from, to) {
        service.search(from, to).then(function success(response) {
            $scope.entities = response.data;
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });

    }

}]
);

app.service('reportService', ['$http', function($http) {
     this.search = function(from, to){
         return $http({
             method : 'GET',
             url : '/report/inventories?from='+from +'&to='+to
         });
     }
 } ]);

