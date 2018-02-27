(function () {
  'use strict';
  angular
    .module('ford.login')
    .config(function ($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          views: {
            '': { 
              templateUrl: 'modules/usuario/views/login.html',
              controller:'mainLogin as login'}
          }
      })
      .state('register', {
        url: '/register',
        views: {
          '': { 
         templateUrl: 'modules/usuario/views/register.html',
         controller:'mainRegister as register' }
        }
      });
      $authProvider.loginUrl = "http://localhost:8000/api/v1/auth/login";
      $authProvider.signupUrl = "http://localhost:8000/api/v1/auth/register";
      //inserir url da api de login
      $authProvider.loginUrl = "http://localhost:8585/api/v1/auth/login";
      $authProvider.signupUrl = "http://localhost:8585/api/v1/auth/register";
     
  });

})();
