'use strict';



var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm']);
app.controller('inventoryCtrl',
['$scope','inventoryService', function ($scope, service) {
    controllerTemplate($scope, service);
    $scope.display = function(entity){
        var display = "";
        if(entity.name){
            display = display = entity.name + " -";
        }
        else{
            display = display = "<empty name> -";
        }

        display= display + "QTY(" + entity.quantity + "/" + entity.initQuantity + ")-cost/price(" + entity.cost + "/" +entity.price +")"

        return display;
    }

    $scope.disableDelete = function (entity) {
        return entity.consumed !=null && entity.consumed > 0;
    }
}]
);

app.service('inventoryService', serviceTemplate("/inventories"));

