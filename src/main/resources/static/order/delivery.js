'use strict';

var app = angular.module('delivery', ['ui.select', 'ngSanitize', 'ng-bs3-datepicker', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm', 'ngHighlight']);

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
            return false;
        }
        if(entity.shippingFee == null){
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
        else{
            $scope.setErrorMessage('Missing Delivery Date/Shipping Fee!');
        }
    }

    $scope.disableComplete = function (entity) {
        return !$scope.validate(entity);
    }

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';
}]
);

app.service('deliveryService', serviceTemplate("/orders", "/search/findByStatusOrderByCreateTimeDesc?status=PENDING_DELIVERY" ));
app.service('inventoryService', serviceTemplate("/inventories"));



