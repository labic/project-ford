(function () {
  'use strict';
  angular
    .module('ford.repositorio')
    .config(function ($stateProvider) {
    $stateProvider
      .state('repositorio', {
      url: '/repositorio',
      views: {
        '': { templateUrl: 'modules/repositorio/views/main.html' },
        'navmenu': { templateUrl: 'modules/repositorio/views/partials/navmenu.html',
                      controller: 'navMenu' }
      }
    });
  });
})();