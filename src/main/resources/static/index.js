'use strict';

var app = angular.module('orderHistory', []);

app.controller('indexCtrl',
['$scope', function ($scope) {

    $scope.page = "index";

    controllerTemplate($scope, null);



}]
);




