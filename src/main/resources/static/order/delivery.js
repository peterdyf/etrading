'use strict';

var app = angular.module('delivery', ['ui.select', 'ngSanitize', 'ng-bs3-datepicker', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm']);

app.controller('deliveryCtrl',
['$scope','deliveryService','inventoryService', function ($scope, deliveryService, inventoryService) {

    controllerTemplate($scope, deliveryService);

    inventoryService.getAll().then(function success(response) {
        $scope.inventories = response.data._embedded['entities'];
    });

    $scope.displayInventory = function (inventoryId) {
        var inventory = $scope.inventories.filter(function( obj ) {
          return obj.id == inventoryId;
        })[0];
        return inventory.name;
    }

    $scope.validate = function (entity) {
        if(entity.deliveryDate == null){
            $scope.setErrorMessage('Delivery Date is empty!');
            return false;
        }
        if(entity.shippingFee == null){
            $scope.setErrorMessage('Shipping Fee is empty!');
            return false;
        }
        return true;
    }

    $scope.revert = function (entity) {
       entity.status = 'PREPARING';
       $scope.save(entity, null, "Order reverted");
    }

     $scope.complete = function (entity) {
        if($scope.validate(entity)){
            entity.status = 'COMPLETED';
            $scope.save(entity, null, "Order completed and move to History");
        }
    }

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';
}]
);

app.service('deliveryService', serviceTemplate("/orders", "/search/findByStatusOrderByCreateTimeDesc?status=PENDING_DELIVERY" ));
app.service('inventoryService', serviceTemplate("/inventories"));



