var ford = angular.module('ford', [
  'ui.router',
  'ui.bootstrap',
  'satellizer',
  'ngCookies',
  'ui.select',
  'shContextMenu',
  'ngResource',
  'ford.core',
  'ford.login',
  'ford.repositorio',
  'ford.visualizacao'
]).config(function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        '': { 
          templateUrl: 'modules/core/views/inicio.html' }
      }
  })
 
});