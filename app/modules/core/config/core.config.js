(function () {
  'use strict';
  angular
    .module('ford.core')
    .run(function ($rootScope) {

      // Module Menu
      $rootScope.modulesMenu = [];

      // Add Module Menu
      $rootScope.addModuleMenu = function (name, uisref, icon) {
        $rootScope.modulesMenu.push({
          name: name,
          sref: uisref,
          icon: icon
        });
      };

    });

})();