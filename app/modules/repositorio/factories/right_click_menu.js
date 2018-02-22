ford.factory('repRightMenu', [
    'ngContextMenu',
    function(ngContextMenu) {
  
    return ngContextMenu({
      controller: 'MenuSup',
      controllerAs: 'contextMenu',
      templateUrl: '/modules/repositorio/views/partials/usuario.html'
    });
  }])