(function () {
  'use strict';
  angular.module('ford.visualizacao', [])
  .run(function (settings) {
    settings.setFromFile('visualizacao.filters', '/data/visualizacao.config.json');
  });
})();
