(function () {
  'use strict';
  angular
    .module('ford.visualizacao')
    .config(function ($stateProvider) {
    $stateProvider
      .state('visualizacao', {
      url: '/visualizacao',
      views: {
        '': { templateUrl: 'modules/visualizacao/views/main.html' }
      }
    });
  });
})();