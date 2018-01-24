(function () {
    'use strict';
  
    angular
      .module('ford.visualizacao')
      .directive('menuSuperiorVisualizacao', function () {
        return {
          templateUrl: 'modules/visualizacao/directives/menu-superior.html',
          restrict: 'E'
        };
      });
  
  })();