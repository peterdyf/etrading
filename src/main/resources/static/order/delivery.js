'use strict';

var app = angular.module('delivery', ['ngSanitize', 'ng-bs3-datepicker', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm', 'ngHighlight','angular-elastic']);

app.controller('deliveryCtrl',
['$scope','deliveryService','inventoryService', function ($scope, deliveryService, inventoryService) {
    $scope.inventories = [];
    controllerTemplate($scope, deliveryService);

    inventoryService.getAll().then(function success(response) {
        var arr = response.data._embedded['entities'];
        $scope.inventories = arr.reduce(function(map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});
    });

    $scope.validate = function (entity) {
        if(entity.deliveryDate == null){
            return false;
        }
        if(entity.shippingFee == null){
            return false;
        }
        if(entity.waybillNumber == null){
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

    $scope.disableComplete = function (entity) {
        return !$scope.validate(entity);
    }

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';
}]
);

app.service('deliveryService', serviceTemplate("/orders", "/search/findByStatusOrderByCreateTimeDesc?status=PENDING_DELIVERY" ));
app.service('inventoryService', serviceTemplate("/inventories"));



