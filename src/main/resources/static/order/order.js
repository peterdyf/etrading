'use strict';

var app = angular.module('order', ['ui.select', 'ngSanitize', 'ng-bs3-datepicker', 'ngNumberPicker']);


app.controller('orderCtrl',
['$scope','orderService','inventoryService', function ($scope, orderService, inventoryService) {
    controllerTemplate($scope, orderService);

    $scope.refreshInventory = function (){
        inventoryService.getAll().then(function success(response) {
            $scope.inventories = response.data._embedded['entities'];
        });
    }

    $scope.parse = function () {
        if ($scope.entity != null && $scope.entity.content != null) {
            var content = $scope.entity.content;
            if((content.match(/\n/g) || []).length == 2){
                var lines = content.split("\n");
                $scope.entity.customer = lines[0];
                $scope.entity.tel = lines[1];
                $scope.entity.address = lines[2];
            }
            else{
                var tel = parsePhone(content);
                if(tel!=null){
                    $scope.entity.tel = tel;
                }
            }
        }
        else {
            $scope.setErrorMessage('Empty content!');
        }
    }

    $scope.validateAndSave = function () {
        if ($scope.entity != null && $scope.entity.calculator != null) {
            if($scope.entity.calculator != $scope.getCaculator()){
                $scope.setErrorMessage('Calculator Unmatched!');
                return;
            }
        }
        $scope.save(function (){
            $scope.refreshInventory();
        });
    }

    $scope.newItem = function () {
        if ($scope.entity != null) {
            if(!$scope.entity.items){
                $scope.entity.items = [];
            }
            $scope.entity.items.push({volume:1});
        }
        else {
            $scope.setErrorMessage('Empty Form!');
        }
    }

    $scope.removeItem = function (item) {
        var index = $scope.entity.items.indexOf(item);
        $scope.entity.items.splice(index, 1);
    }

    $scope.calculate = function (){
        $scope.entity.totalBilling = $scope.getTotal();
        $scope.entity.calculator = $scope.getCaculator();
    }

    $scope.getTotal = function (){
        var total = 0;
        if ($scope.entity != null && $scope.entity.items != null) {
            for( var i in $scope.entity.items){
                var item = $scope.entity.items[i];
                if (item.inventoryId !=null){
                    var inventory = $scope.inventories.filter(function( obj ) {
                      return obj.id == item.inventoryId;
                    })[0];
                    total = total + item.volume * inventory.price;
                }
            }
        }

        var discount = $scope.entity.discount;

        if(discount !=null && discount > 0){
            total = total - discount;
        }

        if(total == 0) {
            total = null;
        }

        return total;
    }

    $scope.getCaculator = function (){
        var calculatorStr = "";
        var total = 0;
        if ($scope.entity != null && $scope.entity.items != null) {
            for( var i in $scope.entity.items){
                var item = $scope.entity.items[i];
                if (item.inventoryId !=null){
                    var inventory = $scope.inventories.filter(function( obj ) {
                      return obj.id == item.inventoryId;
                    })[0];
                    total = total + item.volume * inventory.price;
                    calculatorStr = calculatorStr + "("+inventory.name+") "+inventory.price + " * " + item.volume + " "
                }
            }
        }

        var discount = $scope.entity.discount;

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
        if(inventory == null) return null;
        var quantity = inventory.initQuantity;
        if(inventory.consumed != null){
            quantity = quantity - inventory.consumed
        }
        return inventory.name + " (" + inventory.price + "$) - " + quantity+ "";
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


app.service('orderService', serviceTemplate("/orders/"));
app.service('inventoryService', serviceTemplate("/inventories/"));



