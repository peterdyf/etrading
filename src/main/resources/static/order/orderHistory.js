'use strict';

var app = angular.module('orderHistory', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'mwl.confirm', 'ngHighlight']);

app.controller('orderHistoryCtrl',
['$scope','orderHistoryService','inventoryService', function ($scope, orderHistoryService, inventoryService) {
    controllerTemplate($scope, orderHistoryService);

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';

    inventoryService.getAll().then(function success(response) {
        $scope.inventories = response.data._embedded['entities'];
    });

    $scope.displayInventory = function (inventoryId) {
        var inventory = $scope.inventories.filter(function( obj ) {
          return obj.id == inventoryId;
        })[0];
        return inventory.name;
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



