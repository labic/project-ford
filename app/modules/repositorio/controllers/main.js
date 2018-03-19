ford.controller('mainRepositorio', function ($scope, $state, $auth, $http, settings, $uibModal) {

	//pega as configurações de arquivo
	$scope.config = {
		filter: settings.get('repositorio.filters')
	};

	$scope.status = ['Terminado','Em andamento','Parado','Pausado'];
	$scope.ordem = ['Nome','Tipo','Tamanho crescente','Tamanho decrescente','Mais recente'];
	$scope.url = 'https://ford-data-api.herokuapp.com';
	$scope.selected = [];
	$scope.endereco = [];

	this.logout = function __logout() {
		$auth.logout();
		$state.go('login');
		};

	//teste de botões com ng-click
	$scope.cliquei = function(msg) {
		alert('eae cara! eu sou o '+msg);
	};

	$scope.menuFolders = 
	[
		{
			label: 'Baixar',      // menu option label
			onClick: function ($event) {
				link.href =$event.dataContext.link;
    			link.click();}    // on click handler
		},
		{
			label: 'Editar',      // menu option label
			onClick: function ($event) {
				switch ($event.dataContext.type) {
					case 'directory':
						$scope.open('sm','modules/repositorio/views/partials/nova_pasta.html',$event.dataContext,'Editar');
						break;						
					case 'file':
						$scope.open('sm','modules/repositorio/views/partials/nova_coleta_escolha.html',$event.dataContext, 'Editar');
						break;
				}
			}
				//fazer requisição EDIT pro banco de dados   
		},
		{
			label: 'Mover',
			onClick:function ($event) {
				$scope.selected = [];
				$scope.open('sm','modules/repositorio/views/partials/mover.html',$event.dataContext, 'Mover')
				},
		},
		{
			label: 'Excluir',      // menu option label
			onClick: function ($event) {
				$scope.selected = [$event.dataContext];
				$scope.excluirObj();}   // on click handler
		}
	];

	$scope.menuFiles = ([{
			label: 'Visualizar',      // menu option label
			onClick: function ($event) {
				//fazer requisição pro banco de dados
				$event.dataContext.name = 'visualizar'}   // on click handler
		}]).concat($scope.menuFolders);

	$scope.menuProcess = 
	[
		{
			label: 'Parar',      // menu option label
			onClick: function ($event) {
				//fazer requisição pro banco de dados
				$event.dataContext.name = 'parado'}   // on click handler
		},
		{
			label: 'Continuar',      // menu option label
			onClick: function ($event) {
				//fazer requisição pro banco de dados
				$event.dataContext.name = 'continuando'}   // on click handler
		},
		{
			label: 'Mover',      // menu option label
			onClick: function ($event) {
				$scope.selected = [];
				$scope.open('sm','modules/repositorio/views/partials/mover.html',$event.dataContext, 'Mover')} 
		},
		{
			label: 'Excluir',      // menu option label
			onClick: function ($event) {
				$scope.selected = [$event.dataContext];
				$scope.excluirObj();
				}   // on click handler
		}
	];

	$scope.open = function (size, template,obj, metodo) {

		var modalInstance = $uibModal.open({
			templateUrl: template,
			controller: 'MenuSup',
			size: size,
			resolve: {
				arquivos: function () {
					return $scope.arquivos;
				}, 
				obj: function () {
					return obj;
				}, 
				metodo: function () {
					return metodo;
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
		//esvaziar o array selected
		$scope.selected = [];
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

	$scope.excluirObj = function() {
		//excluir vários objs
		if($scope.selected.length >1) {
			var decisao = confirm("Deseja mesmo excluir estes objetos?");
			if (decisao) {
				$scope.selected.forEach( function (item,index) {
					$scope.arquivos.splice($scope.arquivos.indexOf($scope.selected[index]),1);
					//enviar request pro servidor
				});

				$scope.selected = [];
			};
		} else {
		//excluir um obj
			var decisao = confirm("Deseja mesmo excluir este objeto?");
			if (decisao) {
				$scope.arquivos.splice($scope.arquivos.indexOf($scope.selected[0]),1);
				$scope.selected = [];
				//enviar request pro servidor
			};
		};

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
		favorite: false //,
		// path: 'https://ford-data-api.herokuapp.com'
	};

	// Watch assiste a todos os filtros presentes na página esperando alguma alteração.
	$scope.$watch('filter', function (newFilter, oldFilter) {

		$(".repositorio").scrollTop("slow");
		$scope.countpage = 0;

		// //filtro de path para requisicao
		// if (newFilter.path != oldFilter.path) {
			
		// }

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