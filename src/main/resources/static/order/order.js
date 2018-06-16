'use strict';

var app = angular.module('order', ['ngSanitize', 'ui.select']);

app.controller('orderCtrl',
['$scope','orderService','inventoryService', function ($scope, orderService, inventoryService) {
    controllerTemplate($scope, orderService);

    inventoryService.getAll().then(function success(response) {
        $scope.inventories = response.data._embedded['entities'];
    });

    $scope.parse = function () {
        if ($scope.entity != null && $scope.entity.content != null) {
            var content = $scope.entity.content;

            var tel = parsePhone(content);
            if(tel!=null){
                $scope.entity.tel = tel;
            }
        }
        else {
            $scope.setErrorMessage('Empty content!');
        }
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

    //number-spinner
    $scope.$watch('entity.items', function() {
         var action;
         $(".number-spinner button").mousedown(function () {
             btn = $(this);
             input = btn.closest('.number-spinner').find('input');
             btn.closest('.number-spinner').find('button').prop("disabled", false);

          if (btn.attr('data-dir') == 'up') {
                 action = setInterval(function(){
                     if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                         input.val(parseInt(input.val())+1);
                     }else{
                         btn.prop("disabled", true);
                         clearInterval(action);
                     }
                 }, 50);
          } else {
                 action = setInterval(function(){
                     if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                         input.val(parseInt(input.val())-1);
                     }else{
                         btn.prop("disabled", true);
                         clearInterval(action);
                     }
                 }, 50);
          }
         }).mouseup(function(){
             clearInterval(action);
         });
    });
}]
);

app.directive('numberSpinnerPostRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
        var action;
        $(".number-spinner button").mousedown(function () {
            var btn = $(this);
            var input = btn.closest('.number-spinner').find('input');
            btn.closest('.number-spinner').find('button').prop("disabled", false);

            if (btn.attr('data-dir') == 'up') {
                action = setInterval(function(){
                    if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                        input.val(parseInt(input.val())+1);
                    }else{
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 50);
            } else {
                action = setInterval(function(){
                    if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                        input.val(parseInt(input.val())-1);
                    }else{
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 50);
            }
        }).mouseup(function(){
            clearInterval(action);
        });

    }
  };
})

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



