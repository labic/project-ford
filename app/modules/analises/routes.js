(function () {
  'use strict';
  angular
    .module('ford.analises')
    .config(function ($stateProvider) {
    $stateProvider
      .state('analises', {
      url: '/analises',
      views: {
        '': { templateUrl: 'modules/analises/views/main.html' },
        'navmenu': { templateUrl: 'modules/analises/views/navmenu.html' }
      }
    });
  });
})();