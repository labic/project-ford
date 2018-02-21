(function () {
  'use strict';
  angular.module('ford.repositorio', [])
  .run(function (settings) {
    settings.setFromFile('repositorio.filters', '/data/repositorio.config.json');
  });
})();
