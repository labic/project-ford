var ford = angular.module('ford', [
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'ngResource',
  'ford.core',
  'ford.login',
  'ford.analises',
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