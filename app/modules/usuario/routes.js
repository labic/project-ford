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
              templateUrl: 'modules/usuario/views/login.html' }
          }
      })
     
  });

})();
