'use strict';

var app = angular.module('order', ['ui.select', 'ngSanitize', 'ng-bs3-datepicker', 'ngNumberPicker','ngAnimate', 'ngSanitize', 'ui.bootstrap',  'mwl.confirm', 'ngHighlight', 'angular-elastic']);

app.controller('orderCtrl',
['$scope','orderService','inventoryService', function ($scope, orderService, inventoryService) {

    $scope.page = "order";

    $scope.inventories = [];
    controllerTemplate($scope, orderService);

    $scope.refreshInventory = function (){
        inventoryService.getAll().then(function success(response) {
            var arr = response.data._embedded['entities'];
            $scope.inventories = arr.reduce(function(map, obj) {
                map[obj.id] = obj;
                return map;
            }, {});
        });
    }

    $scope.parse = function (entity) {
        if (entity != null && entity.content != null) {
            var content = entity.content;
            if((content.match(/\n/g) || []).length == 2){
                var lines = content.split("\n");
                entity.customer = lines[0];
                entity.tel = lines[1];
                entity.address = lines[2];
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

    $scope.validateCalc = function (entity) {
        return $scope.getCaculator(entity) == entity.calculator;
    }

    $scope.disableSave = function (entity) {
        return entity.items!=null && entity.items.length>1 && !$scope.validateCalc(entity);
    }



    $scope.validateAndSave = function (entity) {
        if(entity.items==null || entity.items.length==0 || $scope.validateCalc(entity)){
            if(!entity.status){
                entity.status = 'PREPARING'
            }
            $scope.save(entity, function (){
                $scope.refreshInventory();
            });
        }
    }

    $scope.validateDelivery = function (entity) {

        if(!entity.totalBilling){
            return false;
        }
        if(!entity.customer){
            return false;
        }
        if(!entity.tel){
            return false;
        }
        if(!entity.address){
            return false;
        }
        if(!entity.paymentDate){
            return false;
        }
        if(!$scope.validateCalc(entity)){
            return false;
        }
        return true;
    }

    $scope.disableDelivery = function (entity) {
        return !$scope.validateDelivery(entity);
    }

    $scope.readyToDelivery = function (entity) {
        if($scope.validateDelivery(entity)){
            entity.status = 'PENDING_DELIVERY';
            $scope.save(entity, function (){
                $scope.refreshInventory();
            }, "Order moved to Delivery");
        }
    }

    $scope.newItem = function (entity) {
        if(!entity.items){
            entity.items = [];
        }
        entity.items.push({volume:1});
    }

    $scope.removeItem = function (entity, item) {
        var index = entity.items.indexOf(item);
        entity.items.splice(index, 1);
    }

    $scope.bindItemPrice = function (item) {
         if (item.inventoryId !=null){
            var inventory = $scope.inventories[item.inventoryId];
            item.price = inventory.price;
        }
    }

    $scope.calculate = function (entity){
        entity.totalBilling = $scope.getTotal(entity);
        entity.calculator = $scope.getCaculator(entity);
    }

    $scope.getTotal = function (entity){
        var total = 0;
        if (entity != null && entity.items != null) {
            for( var i in entity.items){
                var item = entity.items[i];
                if (item.inventoryId !=null){
                    var inventory = $scope.inventories[item.inventoryId];
                    total = total + item.volume * inventory.price;
                }
            }
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
                    total = total + item.volume * inventory.price;
                    if(calculatorStr!=""){
                        calculatorStr = calculatorStr+"+\n";
                    }
                    calculatorStr = calculatorStr + "("+inventory.name+") $"+inventory.price + " * " + item.volume + " ";
                }
            }
        }

        var discount = entity.discount;

        calculatorStr = calculatorStr + "\n= $" + total;

        if(discount !=null && discount > 0){
            total = total - discount;
            calculatorStr = calculatorStr + " - $" + discount + "\n= $" + total;

        }

        return calculatorStr;
    }

    $scope.displayInventory = function (inventory) {
        return "price: " + inventory.price + " stock: " + inventory.stock;
    }

    $scope.dateOptions = '{format: "YYYY-MM-DD"}';

    $scope.refreshInventory();

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


app.service('orderService', serviceTemplate("/orders", "/search/findByStatusOrderByCreateTimeDesc?status=PREPARING" ));
app.service('inventoryService', serviceTemplate("/inventories"));



