'use strict';

$(document).ready(function () {
    $('.alert').hide();
});

var controllerTemplate = function ($scope, service) {
    $scope.new = function () {
        $scope.entity = null;
    }
    $scope.select = function (id) {
       $scope.entity = $scope.entities.filter(function (entity){return entity.id===id;})[0];
    }

    $scope.save = function () {
        if ($scope.entity != null) {
            if($scope.entity.id == null){
                service.add($scope.entity)
                   .then (function success(response){
                       $scope.setMessage('Added!');
                       $scope.entity = null;
                       $scope.refresh();
                   },
                   function error(response){
                       $scope.setErrorMessage('Error adding!');
                   });
            }
            else{
                service.update($scope.entity)
                   .then(function success(response) {
                       $scope.setMessage('Updated!');
                       $scope.refresh($scope.entity.id);
                   },
                   function error(response) {
                        $scope.setErrorMessage('Error updating!');
                   });
            }
        }
        else {
            $scope.setErrorMessage('Empty form!');
        }
    }

    $scope.remove = function () {
        if ($scope.entity != null) {
            if($scope.entity.id == null){
                 $scope.setErrorMessage('Unsaved Form!');
            }
            else{
                service.remove($scope.entity.id).then (function success(response){
                    $scope.entity = null;
                    $scope.setMessage('Deleted!');
                    $scope.refresh();
                },
                function error(response) {
                    $scope.setErrorMessage('Error deleting!');
                });
            }

        }
        else {
            $scope.setErrorMessage('Empty form!');
        }
    }

    $scope.refresh = function (id) {
        service.getAll().then(function success(response) {
            $scope.entities = response.data._embedded['entities'];
            if(id!=null){
                $scope.select(id);
            }
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });
    }

    $scope.setMessage = function (message, errorMessage){
        console.log("set message " + message +":" + errorMessage);
        $scope.message='';
        $scope.errorMessage = '';
        $('#message').hide();
        $('#errorMessage').hide();
        if(errorMessage != null){
            $scope.errorMessage = errorMessage;
            $('#errorMessage').show();
        }
        if(message != null){
            $scope.message = message;
            $('#message').show();
        }
        window.scrollTo(0, 0);
    }

    $scope.setErrorMessage = function (errorMessage){
        $scope.setMessage(null, errorMessage);
    }
}

var serviceTemplate = function(urlBase){
    return ['$http', function($http) {

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
                url : urlBase + entity.id,
                data : entity
            });
        }

        this.remove = function remove(id){
               return $http({
                   method : 'DELETE',
                   url : urlBase + id
               });
           }

        this.getAll = function getAll() {
            return $http({
                method : 'GET',
                url : urlBase+'?sort=createTime,desc'
            });
        }
    } ];
}






