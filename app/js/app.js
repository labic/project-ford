var ford = angular.module('ford', [
  'ui.router',
  'ng-context-menu',
  'ui.bootstrap',
  'ui.select',
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