'use strict';



var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm']);
app.controller('sfCtrl',
['$scope','sfService', '$http', function ($scope, service, $http) {
    controllerTemplate($scope, service);

    $scope.page = "sf";

    $scope.refreshBoth= function() {
        $scope.refresh();
        $scope.refreshSf().then(function success(response) {
            $scope.newEntities = response.data;
        },
        function error (response) {
            $scope.setErrorMessage('Error getting from SF!');
        });

    }

    $scope.refreshSf = function() {
        return $http({
            method : 'GET',
            url : "/sfAddresses/fromSF"
        });
    }

    $scope.updateSf = function() {
        return $http({
            method : 'PUT',
            url : "/sfAddresses/update"
        }).then (
        function success(response){
            $scope.setMessage('Updated!');
            $scope.refresh();
        },
        function error(response){
            $scope.setErrorMessage('Error adding!');
        }
      )
    }


}]
);

app.service('sfService', serviceTemplate("/sfAddresses"));

