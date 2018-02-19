ford.controller('mainRepositorio', function ($scope, $http, settings, $uibModal) {
  
  //pega as configurações de arquivo
  $scope.config = {
    filter: settings.get('repositorio.filters')
  };

  $scope.status = ['Terminado','Em andamento','Parado','Pausado'];
  $scope.ordem = ['Nome','Tipo','Tamanho crescente','Tamanho decrescente','Mais recente'];
  $scope.selected = [];
  
  //teste de botões com ng-click
  $scope.cliquei = function(msg) {
    alert('eae cara! eu sou o '+msg);
  };

  $scope.open = function (size, template) {
  
    var modalInstance = $uibModal.open({
      templateUrl: template,
      controller: 'MenuSup',
      size: size,
      resolve: {
        arquivos: function () {
          return $scope.arquivos;
        } 
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };
  
  $scope.selectObject = function (obj) {
    if($scope.selected.indexOf(obj) < 0)
      $scope.selected.push(obj);
      else
      $scope.selected.splice($scope.selected.indexOf(obj),1);
  };

  //exemplo de arquivos
  $scope.arquivos = [
    { 
      Nome:'Eleição',
      img:'img/objetos/pasta-100.png',
      tipo:'pasta'

    },
    {
      Nome:'Copa do Mundo',
      img:'img/objetos/pasta-100.png',
      tipo:'pasta'
    },
    {
      Nome:'Japão',
      img:'img/objetos/pasta-100.png',
      tipo:'pasta'
    },
    {
      Nome:'Lula',
      img:'img/objetos/arquivo-100.png',
      tipo:'arquivo'
    },
    {
      Nome:'Bolsonaro',
      img:'img/objetos/arquivo-100.png',
      tipo:'arquivo'
    },
    {
      Nome:'Neymar',
      img:'img/objetos/arquivo-100.png',
      tipo:'arquivo'
    }];

    $scope.selectObject = function (obj) {
      if($scope.selected.indexOf(obj) < 0)
        $scope.selected.push(obj);
        else
        $scope.selected.splice($scope.selected.indexOf(obj),1);
        console.log($scope.selected)
    };

  $scope.filter = {
    status: undefined,
    ordem: 'Nome',
    name: undefined,
    favorite: false
  };

   // Watch assiste a todos os filtros presentes na página esperando alguma alteração.
   $scope.$watch('filter', function (newFilter, oldFilter) {
    console.log(oldFilter);

    $(".repositorio").scrollTop("slow");
    $scope.countpage = 0;

    if ($scope.startPage == 1) {
      //carregar itens da primeira página
      $scope.startPage = 0;
    } else {

      if ((newFilter.status != oldFilter.status) || (newFilter.ordem != oldFilter.ordem)) {
        //$scope.loadItems(newFilter.status, newFilter.ordem, undefined);
      }
      if (newFilter.name != oldFilter.name) {
        //$scope.loadItems(newFilter.status, newFilter.ordem, newFilter.name);
      }
    }

    console.log(newFilter);

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


ford.controller('MenuSup', function ($scope, $uibModalInstance, arquivos) {

  $scope.arquivos = arquivos;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  // funções para menu superior
  $scope.newFolder = function(nome) {
    var obj = { 
      Nome:nome,
      img:'img/objetos/pasta-100.png',
      tipo:'pasta'
    };
    //inserindo localmente
    $scope.arquivos.push(obj);
    //fazendo request pro servidor
    // $http({
    //   url: $scope.url,
    //   method:'POST',
    //   params:{Nome:nome,tipo:'pasta'}
    // })
    // .then(function (response) {
    //     console.log(response)
    // });
    $scope.cancel();
  };

  $scope.newArchive = function(nome,descricao,tags,periodo,chave) {
    var obj = { 
      Nome:nome,
      img:'img/objetos/arquivo-100.png',
      tipo:'arquivo'
    };
    //inserindo localmente
    $scope.arquivos.push(obj);
    //fazendo request pro servidor
    // $http({
    //   url: $scope.url,
    //   method:'POST',
    //   params:{Nome:nome,tipo:'pasta'}
    // })
    // .then(function (response) {
    //     console.log(response)
    // });

    $scope.cancel();
  };
});