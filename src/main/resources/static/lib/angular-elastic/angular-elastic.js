(function(){
    'use strict';
    angular.module('angular-elastic', []).directive('elastic', [
          '$timeout',
          function($timeout) {
              return {
                  restrict: 'A',
                  link: function($scope, element, attr) {
                      $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                      var resize = function() {
                          element[0].style.height = $scope.initialHeight;
                          element[0].style.height = "" + element[0].scrollHeight + "px";
                      };
                      element.on("input change", resize);
                      $timeout(resize, 0);
                      $scope.$watch(attr['ngModel'], function(v){resize();});
                  }
              };
          }
      ]);
})();
