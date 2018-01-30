(function () {
    'use strict';
  
    angular
      .module('ford.analises')
      .directive('menuInferior', function () {
        return {
          templateUrl: 'modules/analises/directives/menu-inferior.html',
          restrict: 'E'
        };
      });
  
  })();