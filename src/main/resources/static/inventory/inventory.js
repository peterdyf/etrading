'use strict';



var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ng-bs3-datepicker', 'ui.bootstrap', 'mwl.confirm', 'ngHighlight']);
app.controller('inventoryCtrl',
['$scope','inventoryService', function ($scope, service) {
    controllerTemplate($scope, service);

    $scope.page = "inventory";


    $scope.display = function(entity){
        var display= entity.name + " -" + "Stock(" + entity.stock + "/" + entity.quantity + ")";
        return display;
    }

    $scope.disableDelete = function (entity) {
        return entity.consumed !=null && entity.consumed > 0;
    }

    $scope.getQuantity = function (entity) {
        var quantity = 0;
        if(entity && entity.purchases){
            for(var i in entity.purchases){
                var purchase = entity.purchases[i];
                if(purchase.quantity){
                    quantity = quantity + purchase.quantity;
                }
            }
        }
        return quantity;
    }

    $scope.newPurchase = function (entity) {
        if(!entity.purchases){
            entity.purchases = [];
        }
        entity.purchases.push({purchaseDate:new Date().toISOString().substring(0, 10)});
    }

    $scope.removePurchase = function (entity, purchase) {
        var index = entity.purchases.indexOf(purchase);
        entity.purchases.splice(index, 1);
    }
}]
);

app.service('inventoryService', serviceTemplate("/inventories"));

