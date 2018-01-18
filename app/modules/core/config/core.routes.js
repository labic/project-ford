(function () {
  'use strict';
  angular
    .module('ford.core')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
    });
})();
