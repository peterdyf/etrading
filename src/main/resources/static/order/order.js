'use strict';

var app = angular.module('order', ['ui.select', 'ngSanitize', 'ng-bs3-datepicker', 'ngNumberPicker','ngAnimate', 'ngSanitize', 'ui.bootstrap',  'mwl.confirm']);

app.controller('orderCtrl',
['$scope','orderService','inventoryService', function ($scope, orderService, inventoryService) {
    controllerTemplate($scope, orderService);

    $scope.refreshInventory = function (){
        inventoryService.getAll().then(function success(response) {
            $scope.inventories = response.data._embedded['entities'];
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
        if (entity != null && entity.calculator != null) {
            if(entity.calculator != $scope.getCaculator(entity)){
                $scope.setErrorMessage('Calculator Unmatched!');
                return false;
            }
        }
        return true;
    }

    $scope.validateAndSave = function (entity) {
        if($scope.validateCalc(entity)){
            if(!entity.status){
                entity.status = 'PREPARING'
            }
            $scope.save(entity, function (){
                $scope.refreshInventory();
            });
        }
    }

    $scope.readyToDelivery = function (entity) {
        if(entity.totalBilling == null){
            $scope.setErrorMessage('Uncalculated Order!');
            return false;
        }
        if(entity.customer == null){
            $scope.setErrorMessage('Customer is empty!');
            return false;
        }
        if(entity.tel == null){
            $scope.setErrorMessage('Tel is empty!');
            return false;
        }
        if(entity.address == null){
            $scope.setErrorMessage('Address is empty!');
            return false;
        }
        if(entity.paymentDate == null){
            $scope.setErrorMessage('Payment Date is empty!');
            return false;
        }
        entity.status = 'PENDING_DELIVERY';
        if($scope.validateCalc(entity)){
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
                    var inventory = $scope.inventories.filter(function( obj ) {
                      return obj.id == item.inventoryId;
                    })[0];
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
                if (item.inventoryId !=null){
                    var inventory = $scope.inventories.filter(function( obj ) {
                      return obj.id == item.inventoryId;
                    })[0];
                    total = total + item.volume * inventory.price;
                    calculatorStr = calculatorStr + "("+inventory.name+") "+inventory.price + " * " + item.volume + " "
                }
            }
        }

        var discount = entity.discount;

        if(discount !=null && discount > 0){
            total = total - discount;
            calculatorStr = calculatorStr + "- " + discount + " ";
        }

        if(total == 0) {
            total = null;
        }
        else{
            calculatorStr = calculatorStr + "= " + total;
        }
        return calculatorStr;
    }

    $scope.displayInventory = function (inventory) {
        return inventory.name + " (" + inventory.price + "$) - " + inventory.quantity+ "";
    }

    $scope.sources = ['Facebook','Instagram','WhatsApp'];
    $scope.paymentMethods = ['HSBC - Kiwi','BOC - Kiwi','Payme - Kiwi','Payme - Jessie'];
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



