(function () {
  'use strict';

  angular
    .module('ford.core')
    .controller('HomeCtrl', function ($scope, $rootScope) {
      $scope.count = 10;
    });

})();
