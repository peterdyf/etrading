'use strict';

var app = angular.module('orderHistory', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm', 'ngHighlight', 'angular-elastic']);

app.controller('orderHistoryCtrl',
['$scope','orderHistoryService','inventoryService', function ($scope, orderHistoryService, inventoryService) {

    $scope.page = "orderHistory";

    $scope.inventories = [];
    controllerTemplate($scope, orderHistoryService);

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';

    inventoryService.getAll().then(function success(response) {
        var result = response.data._embedded;
        $scope.inventories = result[Object.keys(result)[0]];
    });

    $scope.displayInventory = function (inventoryId) {
        if(!$scope.inventories){
            return null;
        }
        var inventory = $scope.inventories.filter(function( obj ) {
         return obj.id == inventoryId;
        })[0];
        if(inventory){
            return inventory.name;
        }
        return null;
   }

    $scope.revert = function (entity) {
        entity.status = 'PENDING_DELIVERY';
        $scope.save(entity, null, "Order Revert to Delivery");
    }

    $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

      $scope.items = ['Item 1', 'Item 2', 'Item 3'];

}]
);

app.service('orderHistoryService', serviceTemplate("/orders", "/search/findByStatusOrderByCreateTimeDesc?status=COMPLETED" ));
app.service('inventoryService', serviceTemplate("/inventories"));



