(function () {
    'use strict';
  
    angular
      .module('ford.repositorio')
      .directive('menuSuperior', function () {
        return {
          templateUrl: 'modules/repositorio/directives/menu-superior.html',
          restrict: 'E'
        };
      });
  
  })();