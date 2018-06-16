'use strict';

var app = angular.module('inventory', []);
app.controller('inventoryCtrl',
['$scope','inventoryService', function ($scope, service) {
    controllerTemplate($scope, service);
}]
);

app.service('inventoryService', serviceTemplate("/inventories/"));

