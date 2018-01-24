(function () {
    'use strict';
  
    angular
      .module('ford.analises')
      .directive('menuSuperior', function () {
        return {
          templateUrl: 'modules/analises/directives/menu-superior.html',
          restrict: 'E'
        };
      });
  
  })();