(function () {
    'use strict';
  
    angular
      .module('ford.repositorio')
      .directive('menuInferior', function () {
        return {
          templateUrl: 'modules/repositorio/directives/menu-inferior.html',
          restrict: 'E'
        };
      });
  
  })();