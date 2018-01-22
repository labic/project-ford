(function () {
  'use strict';
  angular.module('ford.analises', [])
  .run(function (settings) {
    settings.setFromFile('analises.filters', '/data/analises.config.json');
  });
})();
