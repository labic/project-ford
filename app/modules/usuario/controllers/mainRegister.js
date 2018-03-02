(function () {
    'use strict';
    angular
     .module('ford.login')
     .controller('mainRegister', function ($state, $auth) {
       var vm = this;
       vm.user = {};
       vm.register = function __register() {
         $auth.signup({
           name: vm.user.name,
           email: vm.user.email,
           password: vm.user.password
         }).then(function (response) {
           console.log(response);
           $state.go("repositorio");
         }).catch(function (response) {
           console.log(response);
           window.alert("Error: Register failed");
         });
       };
     })
    
    })(); 