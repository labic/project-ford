var ford = angular.module('ford', [
  'ui.router',
  'ngResource',
  'ford.core',
  'ford.login'
]).config(function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: 'home',
      // views: {
      //   '': { 
      //     templateUrl: 'modules/usuario/views/login.html' }
      // }
  })
 
});