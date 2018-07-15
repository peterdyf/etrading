'use strict';

var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ng-bs3-datepicker', 'ui.bootstrap', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.expandable']);

app.controller('reportCtrl',
['$scope','reportService', 'uiGridConstants', 'inventoryService', function ($scope, service, uiGridConstants, inventoryService) {
    controllerTemplate($scope, service);
    $scope.fxRate = 0.85;
    $scope.page = "reportSummary";
    $scope.columns = [
        { field: 'paymentDate', width:100},
        { field: 'source', displayName: 'Platform', width:100},
        { field: 'customer', width:150},
        { field: 'tel', displayName: 'Phone', width:100},
        { field: 'address', width:300},
        { field: 'shippingFeeInBill', displayName: 'Shipping Fee in Bill($)', width:100},
        { field: 'discount', displayName: 'Discount ($)', width:100},
        { field: 'paymentMethod', width:125},
        { field: 'waybillNumber', width:150},
        { field: 'deliveryDrawee', displayName: 'Delivery By', width:75},
        { field: 'totalBilling', displayName: 'Total Income($)', width:100, aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'shippingFeeActual', displayName: 'Shipping Fee Actually ($)', width:100, aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'totalCostUsd', displayName: 'Total Inventory Cost ($)', width:125, aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'pl', displayName: 'P/L ($)', width:125, aggregationType: uiGridConstants.aggregationTypes.sum}
    ];

    $scope.subColumns = [
        { field: 'inventoryName'},
        { field: 'quantity', displayName: 'Qty'},
        { field: 'price', displayName: 'Price ($)'},
        { field: 'totalCost', displayName: 'Total Cost (¥)'},
        { field: 'totalCostUsd', displayName: 'Total Cost ($)'}
    ];

    $scope.gridOptions = {
        enableSorting: true,
        enableColumnResizing: true,
        appScopeProvider: $scope,
        showColumnFooter: true,
        enableGridMenu: true,
        columnDefs: $scope.columns,
        expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" style="height:150px;"></div>',
        expandableRowScope: {
          subGridVariable: 'subGridScopeVariable'
        },
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.$watchGroup(['entities', 'fxRate'], function() {
        var data = $scope.entities;
        var fxRate = $scope.fxRate;
        if(data){
            var seq = 0;
            for(var i in data){
                seq = seq + 1;
                data[i].seq = seq;
                data[i].subGridOptions = {
                      columnDefs: $scope.subColumns,
                      data: data[i].items,
                      appScopeProvider: $scope,
                      disableRowExpandable: data[i].items.length==0
                };

                var totalCost=0;

                for (var j in data[i].items){
                    var item = data[i].items[j];
                    var inventory = $scope.inventories[item.inventoryId];
                    item.inventoryName = inventory.name;
                    item.cost = inventory.cost;
                    item.totalCost = inventory.cost * item.quantity;
                    item.totalIncome = inventory.price * item.quantity;
                    totalCost = totalCost + item.totalCost;
                    if(fxRate){
                        item.totalCostUsd = (item.totalCost * fxRate).toFixed(2);
                    }
                }
                data[i].totalCost = totalCost;
                if(fxRate){
                    data[i].totalCostUsd = (data[i].totalCost * fxRate).toFixed(2);

                    var shippingFeeActual = 0;
                    if(data[i].shippingFeeActual){
                        shippingFeeActual = data[i].shippingFeeActual;
                    }
                    data[i].pl = (data[i].totalBilling - data[i].totalCost * fxRate - shippingFeeActual).toFixed(2);
                }
            }
            $scope.gridOptions.data = data;
        }
    });

    $scope.search = function (from, to) {
        service.search(from, to).then(function success(response) {
            $scope.entities = response.data;
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });
    }

    $scope.export = function () {
        var data = {
            from: $scope.from,
            to: $scope.to,
            orders:$scope.entities,
            fxRate:$scope.fxRate
        }

        service.export(data).then(function success(result) {
           var headers = result.headers
           var contentType = headers['content-type'];

           var linkElement = document.createElement('a');
           try {
               var blob = new Blob([result.data], { type: contentType });
               var url = window.URL.createObjectURL(blob);

               linkElement.setAttribute('href', url);
               linkElement.setAttribute("download", 'SummaryReport(' + $scope.from + '~' + $scope.to + ').xlsx');

               var clickEvent = new MouseEvent("click", {
                   "view": window,
                   "bubbles": true,
                   "cancelable": false
               });
               linkElement.dispatchEvent(clickEvent);
           } catch (ex) {
               console.log(ex);
           }
        },
        function error (response) {
            $scope.setErrorMessage('Error export!');
        });
    }

    $scope.from = new Date().toISOString().slice(0, 10);
    $scope.to = new Date().toISOString().slice(0, 10);

    inventoryService.getAll().then(function success(response) {
        var result = response.data._embedded;
        var arr = result[Object.keys(result)[0]];
        $scope.inventories = arr.reduce(function(map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});
    });

}]
);

app.service('reportService', ['$http', function($http) {
    this.search = function(from, to){
        return $http({
            method : 'GET',
            url : '/report/summary?from='+from +'&to='+to
        });
    }
    this.export = function(data){
        return $http({
            method : 'POST',
            url : '/report/exportSummary',
            data: data,
            responseType: 'arraybuffer'
        });
    }
 } ]);

app.service('inventoryService', serviceTemplate("/inventories","/search/getAll"));

