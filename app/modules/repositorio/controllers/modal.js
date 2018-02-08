ford.controller('modal', function ($scope, $uibModal) {

  //pegar dados do banco e inserir aqui
  $scope.user ={
    "name" : "José da silva",
    "date" : "18/05/1975",
    "type" : "padrão"
  };

  $scope.open = function (size, template) {

    var modalInstance = $uibModal.open({
      templateUrl: template,
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        user: function () {
          return $scope.user;
        } 
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };
});

ford.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, user) {

  $scope.user = user;

  $scope.change = function (name,date,type) {
    $scope.user = {
      "name" : name,
      "date" : date,
      "type" : type
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  // funções para menu superior
  $scope.newFolder = function(name) {
    var obj = { 
      Nome:name,
      img:'img/objetos/pasta-100.png',
      tipo:'pasta'
    };
    console.log("oie")
    
    return obj;

  };
});