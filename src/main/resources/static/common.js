'use strict';

var controllerTemplate = function ($scope, service) {

    $scope.pages = [
        {name: 'inventory', url: '/inventory/inventory.html', display: 'Inventory'},
        {name: 'order', url: '/order/order.html', display: 'Order'},
        {name: 'delivery', url: '/order/delivery.html', display: 'Delivery'},
        {name: 'orderHistory', url: '/order/orderHistory.html', display: 'Order History'},
        {name: 'reportInventory', url: '/report/inventoryReport.html', display: 'Report-Inventory'},
        {name: 'reportSummary', url: '/report/summaryReport.html', display: 'Report-Summary'}
    ];

    $scope.query = function(entity){
        if(!$scope.filter) return true;
        var regExp = new RegExp($scope.filter, 'gi');
        return regExp.test(entity.name);
    };

    $scope.isNew = function (e) {
        return e != null && e.id == null;
    }

    $scope.insert = function () {
        if($scope.entities.length > 0 && $scope.entities[0].id == null){
            $scope.entities.shift();
        }
        $scope.entities.unshift(new Object());
    }

    $scope.save = function (_entity, thenFunc, message) {
        var entity = Object.assign({}, _entity);
        delete entity._links;
        if(entity.id == null){
            service.add(entity).then (
                function success(response){
                           if(!message){
                            message = 'Added!';
                           }
                           $scope.setMessage(message);
                           $scope.refresh();
                           if(thenFunc){
                                thenFunc();
                           }
                },
                function error(response){
                   $scope.setErrorMessage('Error adding!');
                }
            );
        }
        else{
            service.update(entity).then(
                function success(response) {
                    if(!message){
                        message = 'Updated!';
                    }
                    $scope.setMessage(message);
                    $scope.refresh();
                    if(thenFunc){
                        thenFunc();
                    }
                },
                function error(response) {
                    $scope.setErrorMessage('Error updating!');
                }
            );
        }
    }

    $scope.remove = function (entity) {
        if(entity.id==null){
            $scope.entities.shift();
            $scope.setErrorMessage('Deleted!');
        }
        else{
            service.remove(entity.id).then (function success(response){
                $scope.setMessage('Deleted!');
                $scope.refresh();
            },
            function error(response) {
                $scope.setErrorMessage('Error deleting!');
            });
        }
    }

    $scope.refresh = function () {
        service.getAll().then(function success(response) {
            var result = response.data._embedded;
            $scope.entities = result[Object.keys(result)[0]];
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });
    }

    $scope.setMessage = function (message, errorMessage){
        if(errorMessage != null){
            $scope.errorMessage = errorMessage;
            $('#errorMessage').show();
            $scope.showErrorMessage=true;
            $scope.showMessage=false;
        }
        if(message != null){
            $scope.message = message;
            $('#message').show();
            $scope.showMessage=true;
            $scope.showErrorMessage=false;
        }
        $scope.back();
    }

    $scope.back = function (){
        window.scrollTo(0, 0);
    }

    $scope.setErrorMessage = function (errorMessage){
        $scope.setMessage(null, errorMessage);
    }
}

var serviceTemplate = function(urlBase, query){

    var searchURl;
    if(query){
        searchURl=urlBase + query;
    }
    else{
        searchURl=urlBase+'?sort=createTime,desc';
    }

    return ['$http', function($http) {

        this.searchURl = searchURl;

        this.add = function add(entity) {
            return $http({
                method : 'POST',
                url : urlBase,
                data : entity
            });
        }

        this.update = function update(entity) {
            return $http({
                method : 'PUT',
                url : urlBase + "/" + entity.id,
                data : entity
            });
        }

        this.remove = function remove(id){
               return $http({
                   method : 'DELETE',
                   url : urlBase + "/" + id
               });
           }

        this.getAll = function getAll(query) {
            return $http({
                method : 'GET',
                url : this.searchURl
            });
        }
    } ];
}






