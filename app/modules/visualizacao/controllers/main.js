ford.controller('mainVisualizacao', function ($scope, $http, settings) {

  $scope.config = {
    filter: settings.get('visualizacao.filters')
  };

  // Filtro útil
  $scope.filter = {
    time: $scope.config.filter.period.values[2].value,
    profileType: 'page',
    actor: $scope.config.filter.actors[0].tag,
    word: undefined,
    theme: undefined,
    tag: undefined,
    page: 1,
    per_page: 25
  };

  $scope.startPage = 1;

  // Watch assiste a todos os filtros presentes na página esperando alguma alteração.
  $scope.$watch('filter', function (newFilter, oldFilter) {

    $(".geralTweets_result").scrollTop("slow");
    $scope.countpage = 0;

    if ($scope.startPage == 1) {

      $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, undefined, undefined);

      $scope.startPage = 0;
    } else {

      if ((newFilter.actor != oldFilter.actor) || (newFilter.time != oldFilter.time)) {
        $scope.loadReplys(newFilter.time, newFilter.profileType, newFilter.actor);
      }
      if (newFilter.word != oldFilter.word) {
        $scope.replyWordPosts(newFilter.time, newFilter.actor, newFilter.word);
      }
      if (newFilter.theme != oldFilter.theme) {
        $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, newFilter.theme, undefined);
      }
      if (newFilter.tag != oldFilter.tag) {
        $scope.replyPost(newFilter.time, newFilter.profileType, newFilter.actor, undefined, undefined, newFilter.tag);
      }
    }
  }, true);

  /*************** Funções de tratamento ***************/

  $scope.loading = function (divId, divResult) {
    $("#loading" + divId).show();
    $("#error" + divId).hide();
    $("#empty" + divId).hide();
    $("#" + divResult).hide();
  }

  $scope.sucess = function (divId, divResult) {
    $("#loading" + divId).hide();
    $("#" + divResult).show();
  }

  $scope.empty = function (divId) {
    $("#loading" + divId).hide();
    $("#empty" + divId).show();
  }

  $scope.error = function (divId) {
    $("#loading" + divId).hide();
    $("#error" + divId).show();
  }
});
