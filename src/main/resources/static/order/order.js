'use strict';

var app = angular.module('order', ['ui.select','ngSanitize', 'ng-bs3-datepicker', 'ngNumberPicker','ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.validation', 'ui.validate',  'mwl.confirm', 'ngHighlight', 'angular-elastic']);

app.controller('orderCtrl',
['$scope','orderService','inventoryService', 'sfService' , function ($scope, orderService, inventoryService, sfService) {

    $scope.page = "order";
    $scope.inventories = {};
    $scope.sfAddresses =[];
    $scope.sfAddress ={};

    controllerTemplate($scope, orderService);

    sfService.search().then(function success(response) {
        $scope.sfAddresses = response.data;
    });

    $scope.refreshInventory = function (){
        inventoryService.getAll().then(function success(response) {
            var result = response.data._embedded;
            var arr = result[Object.keys(result)[0]];
            $scope.inventories = arr.reduce(function(map, obj) {
                map[obj.id] = obj;
                return map;
            }, {});
        });
    }

    $scope.parse = function (entity) {
        if (entity != null && entity.content != null) {
            var content = entity.content;
            if((content.match(/\n/g) || []).length >= 2){
                var lines = content.split("\n");
                entity.customer = lines[0].replace(/^.+\:/,'').replace(/^.+\：/,'');
                entity.tel = lines[1].replace(/\D/g,'');
                entity.address = lines[2].replace(/^.+\:/,'').replace(/^.+\：/,'');
                var addresses = $scope.sfAddresses.filter(function (add) {
                    return add.indexOf(entity.address) >= 0;
                })
                if(addresses.length==1){
                    entity.address=addresses[0];
                    $scope.sfAddress.value=addresses[0];
                }
            }
            else{
                var tel = parsePhone(content);
                if(tel!=null){
                    entity.tel = tel;
                }
            }
        }
        else {
            $scope.setErrorMessage('Empty content!');
        }
    }

    $scope.validateAndSave = function (entity) {
        if(!entity.status){
            entity.status = 'PREPARING'
        }
        $scope.save(entity, function (){
            $scope.refreshInventory();
        });
    }

    $scope.readyToDelivery = function (entity) {
        entity.status = 'PENDING_DELIVERY';
        $scope.save(entity, function (){
            $scope.refreshInventory();
        }, "Order moved to Delivery");
    }

    $scope.newItem = function (entity) {
        if(!entity.items){
            entity.items = [];
        }
        entity.items.push({quantity:1});
    }

    $scope.removeItem = function (entity, item) {
        var index = entity.items.indexOf(item);
        entity.items.splice(index, 1);
    }

    $scope.bindItemPrice = function (item) {
         if (item.inventoryId !=null){
            var inventory = $scope.inventories[item.inventoryId];
            if(inventory){
                item.price = inventory.price;
            }
        }
    }

    $scope.getTotal = function (entity){
        var total = 0;
        if (entity != null && entity.items != null) {
            for( var i in entity.items){
                var item = entity.items[i];
                if (item.inventoryId !=null){
                    var inventory = $scope.inventories[item.inventoryId];
                    total = total + item.quantity * inventory.price;
                }
            }
        }

        var shippingFeeInBill = entity.shippingFeeInBill;

        if(shippingFeeInBill !=null && shippingFeeInBill > 0){
            total = total + shippingFeeInBill;
        }

        var discount = entity.discount;

        if(discount !=null && discount > 0){
            total = total - discount;
        }

        if(total == 0) {
            total = null;
        }

        return total;
    }

    $scope.getCaculator = function (entity){
        var calculatorStr = "";
        var total = 0;
        if (entity != null && entity.items != null) {
            for( var i in entity.items){
                var item = entity.items[i];
                if (item.inventoryId !=null && $scope.inventories[item.inventoryId]){
                    var inventory = $scope.inventories[item.inventoryId];
                    total = total + item.quantity * inventory.price;
                    if(calculatorStr!=""){
                        calculatorStr = calculatorStr+"+\n";
                    }
                    calculatorStr = calculatorStr + "("+inventory.name+") $"+inventory.price + " * " + item.quantity + " ";
                }
            }
        }

        calculatorStr = calculatorStr + "\n= $" + total;

        var shippingFeeInBill = entity.shippingFeeInBill;

        if(shippingFeeInBill !=null && shippingFeeInBill > 0){
            total = total + shippingFeeInBill;
            calculatorStr = calculatorStr + " + (Shipping Fee) $" + shippingFeeInBill + "\n= $" + total;
        }

        var discount = entity.discount;

        if(discount !=null && discount > 0){
            total = total - discount;
            calculatorStr = calculatorStr + " - (discount) $" + discount + "\n= $" + total;
        }



        return calculatorStr;
    }

    $scope.displayInventory = function (inventory) {
        return "price: " + inventory.price + " stock: " + inventory.stock;
    }

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';

    $scope.refreshInventory();

    $scope.$watchGroup(['entities', 'inventories'], function() {
        if($scope.entities.length>0 && Object.keys($scope.inventories).length>0){
            for(var i = 0; i < $scope.entities.length; i++ ){
                $scope.$watch('entities[' + i + ']', function (entity) {
                    entity.calculator =  $scope.getCaculator(entity);
                    entity.totalBilling = $scope.getTotal(entity);
                }, true);
            }
        }
    });

}]
);


function parsePhone(content){
    var pattern = /.*(\d{4}).{0,2}(\d{4}).*/;
    var result = content.match(pattern);
    if(result){
        return result[1] + result[2];
    }
    return null;
}


app.service('orderService', serviceTemplate("/orders", "/search/findByStatus?status=PREPARING" ));
app.service('inventoryService', serviceTemplate("/inventories","/search/getAll"));
app.service('sfService', ['$http', function($http) {
     this.search = function(){
         return $http({
             method : 'GET',
             url : '/sfAddresses/fromSF'
         });
     }
 } ]);

