
ford.controller('MenuSup', function ($scope, $uibModal, $uibModalInstance, arquivos, obj, metodo) {

	$scope.arquivos = arquivos;
  	$scope.obj = obj;
  	$scope.metodo = metodo;
	$scope.sortArquivos = function(){
		$scope.arquivos.sort(function(a,b){
			//mesmo tipo
			if (a.type == b.type) {
				return a.name.localeCompare(b.name);
			}
			//tipos diferentes
			else {
				//se um dos dois eh diretorio
				if (a.type == 'directory') {
					return -1;
				} else if (b.type == 'directory') {
					return 1;
				}
				//se um dos dois eh arquivo pronto
				if (a.type == 'file') {
					return -1;
				} else if (b.type == 'file') {
					return 1;
				}
			}
		});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
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

	// funções para menu superior
	$scope.newFolder = function(name) {

    if($scope.obj == null) {
      $scope.obj = {
        described : '',
        date_created_at : (new Date()),
        type : 'directory',
        size : 0
      }
    }
    $scope.obj.name = name;
    $scope.obj.date_last_modify = (new Date());
    
		//inserindo localmente
		if($scope.arquivos.indexOf($scope.obj) < 0) {
			$scope.arquivos.push($scope.obj);
		}
		$scope.sortArquivos();
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

	$scope.newColect = function() {
    
    if($scope.obj == null) {
        $scope.obj.date_created_at = (new Date());
        $scope.obj.type = 'file';
    };
    $scope.obj.date_last_modify = (new Date());
	
		//inserindo localmente
		if($scope.arquivos.indexOf($scope.obj) < 0) {
			$scope.arquivos.push($scope.obj);
		}
		$scope.sortArquivos();
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
