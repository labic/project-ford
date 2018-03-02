(function () {
    'use strict';
    angular
      .module('ford.login')
      .controller('mainLogin', function($state, $auth) {
           var vm = this;
           vm.user = {};
           vm.login = function __login() {
             $auth.login({
               email: vm.user.email,
               password: vm.user.password
             }).then(function (response) {
               console.log(response);
               $state.go("repositorio");
             }).catch(function (response) {
               console.log(response);
               window.alert("Error: Login failed");
             });
           };
      });
  
  })();