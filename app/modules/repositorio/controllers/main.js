ford.controller('mainRepositorio', function ($scope, $http, settings, $uibModal) {

	//pega as configurações de arquivo
	$scope.config = {
		filter: settings.get('repositorio.filters')
	};

	$scope.status = ['Terminado','Em andamento','Parado','Pausado'];
	$scope.ordem = ['Nome','Tipo','Tamanho crescente','Tamanho decrescente','Mais recente'];
	$scope.url = 'https://ford-data-api.herokuapp.com';
	$scope.selected = [];
	$scope.endereco = [];

	//teste de botões com ng-click
	$scope.cliquei = function(msg) {
		alert('eae cara! eu sou o '+msg);
	};

	$scope.menuOptions = 
	[
		{
			label: 'Save',      // menu option label
			onClick: menuSave   // on click handler
		},
		{
			label: 'Edit',
			onClick: menuEdit,
			disabled: function (dataContext) {
				return "item 2";
			}
		},
		{
			label: 'Details',
			onClick: menuEdit
		},
		{
			divider: true       // will render a divider
		},
		{
			label: 'Remove',
			onClick: menuRemove
		}
	];

	function menuSave($event) {
		console.log($event);
	}
	function menuRemove($event) {
		console.log($event);
	}
	function menuEdit($event) {
		console.log($event);
	}

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
	$scope.totalSelecionado = function () {
		var total = 0;
		for (var i = 0; i < $scope.selected.length; i++) {
				total = total + $scope.selected[i].stats.space_disk;
				}
		return total;
	};

	//exemplo de get da api de dados
	$scope.get = function(id, path) {
		//verifica se está voltando no diretório
		for(var i = 0; i < $scope.endereco.length; i++) {
			if ($scope.endereco[i].name == id) {
				$scope.endereco.splice(i,$scope.endereco.length-i);
				break;
			}};

		$http({
			url: path,		//manter $scope.url da api de dados
			method:'GET',
			Origin: path,
			params:{}		//colocar o parametro de qual user e id de pasta ou arquivo solicitar
		})
			.then(function (response) {
			$scope.arquivos = response.data.data;
			$scope.sortArquivos();
			$scope.endereco.push({name:id,url:path})
		});
	};

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

	$scope.selectObject = function (obj) {
		if($scope.selected.indexOf(obj) < 0)
			$scope.selected.push(obj);
		else
			$scope.selected.splice($scope.selected.indexOf(obj),1);
	};

	//menu da dashboard
	$scope.menuDashboard = 
	[
		{
			label: 'Nova pasta',      // menu option label
			onClick: function ($event) {
			$scope.open('sm','modules/repositorio/views/partials/nova_pasta.html')}   // on click handler
		},
		{
			label: 'Nova coleta',
			onClick: function ($event) {
				$scope.open('sm','modules/repositorio/views/partials/nova_coleta_escolha.html')}
		},
		{
			label: 'Nova estratégia',
			onClick: function ($event) {
				$scope.open('sm','modules/repositorio/views/partials/nova_visualizacao.html')}
		},
		// {
		// 	divider: true       // will render a divider
		// },
		{
			label: 'Nova estatística',	//falta atualizar com o layout
			onClick: function ($event) {
				$scope.open('sm','modules/repositorio/views/partials/nova_visualizacao.html')}
		}
	];

	$scope.filter = {
		status: undefined,
		ordem: 'Nome',
		name: undefined,
		favorite: false
	};

	// Watch assiste a todos os filtros presentes na página esperando alguma alteração.
	$scope.$watch('filter', function (newFilter, oldFilter) {

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


ford.controller('MenuSup', function ($scope, $uibModalInstance, arquivos, $uibModal) {

	$scope.arquivos = arquivos;
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

	// funções para menu superior
	$scope.newFolder = function(nome) {
		var obj = { 
			name:nome,
			described:'',
			date_created_at: (new Date()),
			date_last_modify:(new Date()),
			type:'directory'
		};
		//inserindo localmente
		$scope.arquivos.push(obj);
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

	$scope.newArchive = function(nome,descricao,tags,periodo,chave) {
		var obj = { 
			name:nome,
			described:'',
			date_created_at: (new Date()),
			date_last_modify:(new Date()),
			type:'file'
		};
		//inserindo localmente
		$scope.arquivos.push(obj);
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