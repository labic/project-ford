
ford.controller('navMenu', function ($scope, $stateParams, $uibModal, settings) {

    $scope.config = settings.get('repositorio.filters');

    $scope.user = $scope.config.user;

	$scope.open = function (size, template) {

		var modalInstance = $uibModal.open({
			templateUrl: template,
			controller: 'navModal',
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

	// funções para menu superior
	$scope.configUser = function(name) {

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

	$scope.configTwitter = function(name,description,tags, archive) {
		//enviar request para servidor com os dados do arquivo upado
		console.log(archive)
		
		$scope.cancel();
	};

	$scope.configFacebook = function() {
    
		if($scope.obj == null) {
			$scope.obj.date_created_at = (new Date());
			$scope.obj.type = 'file';
		};
		$scope.obj.date_last_modify = (new Date());
		
			//inserindo localmente
			// if($scope.arquivos.indexOf($scope.obj) < 0) {navMenu
			// 	$scope.arquivos.push($scope.obj);
			// }
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


ford.controller('navModal', function ($scope, $uibModal, $uibModalInstance, user) {

	$scope.user = user;

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.open = function (size, template) {

		var modalInstance = $uibModal.open({
			templateUrl: template,
			controller: 'navModal',
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
