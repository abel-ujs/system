angular.module("link.controllers",["link.services","ui.bootstrap","link.permission"])
.controller("mainCtl",function($scope,permissionService,$location,UserService,permissionService,$uibModal){
	$scope.logOff = logOff;
	console.log("mainCtl");
	$scope.changePassword=changePassword;
	
	$scope.$on('$routeChangeStart', function(scope, next, current) {
		if(!permissionService.hasLogin()) $location.path('/login');
		else {
			var permission = next.$$route.permission;
			if(permission==null ||permission==''|| permission==undefined) return ;
			if((typeof(permission)=='string') && !permissionService.hasPermission(permission))
				$location.path('/unAuth');
		}
	});
	
	function changePassword(){
		$uibModal.open({
      		animation: $scope.animationsEnabled,
      		templateUrl:"templates/changePassword.html",
      		controller:"changePasswordCtl",
      		animation:true
		})
	}
	function logOff(){
		UserService.logOff().then(function(){
			permissionService.setPermission([]);
			$location.path('/login');
		})
	}
})
.controller("changePasswordCtl",function($scope,$uibModalInstance,UserService){
	$scope.ok = ok;
	$scope.cancel = cancel;
	function ok(){
		if($scope.password!=$scope.password2) alert("密码不一致");
		else {
			UserService.changePassword($scope.password).then(function(data){
				if(data){$uibModalInstance.close();}
				else{alert('修改失败')}
			});
			
		}
		console.log($scope.password)
		console.log($scope.password2);
	}
	function cancel(){
		$uibModalInstance.dismiss('cancel');
	}
})
.controller("homeCtl",function($scope,$rootScope,nav,UserService){
	UserService.getLoginUser().then(function(data){
		$scope.logUser=data;
	});
	nav.setCurrent('home');
	$rootScope.nav = nav;
})
.controller("computerCtl",function($scope,$rootScope,$uibModal,nav,computers,linkroutes,UserService){
	UserService.getLoginUser().then(function(data){
		$scope.logUser=data;
	});
	nav.setCurrent('computer');
	$rootScope.nav = nav;

	computers.request($scope.key).then(
		function(_computers){
			$scope.computers=_computers;
		})
	/*$scope.computers = computers.getList();*/
	$scope.pageChanged=pageChanged;
	$scope.refresh = refresh;
	$scope.deleteComputer = deleteComputer;
	$scope.open = open;

	function pageChanged(){
		computers.request($scope.key);
	}
	function refresh(){
		computers.request($scope.key);
	}
	function deleteComputer(_id){
		if(confirm("确定删除吗？")){
			linkroutes.isActive({id:_id}).success(function(result){
			if(result){
				alert("机器已经占用，请先删除链路");
			}else{
				computers.deleteComputer({id:_id});
			}
			})

		}
				
	}
	function open(id) {
		var modalInstance = $uibModal.open({
      		animation: $scope.animationsEnabled,
      		templateUrl:"templates/computerEdit.html",
      		controller:"computerEditCtl",
      		animation:true,
			resolve:{
        		id: function () {
          			return id;
        		}
      		}
		})
	}

	
	
})
.controller("computerEditCtl",function($uibModalInstance,$scope,id,computers,$http){
	if(id!=undefined) $scope.operate='1'
	else $scope.operate='0';
	$http({
		method:"get",
		url:"computer/getOne.do",
		params:{
				entity:id
			}
	}).then(function(result){
		$scope.computer = result.data;
	})
	
	$scope.ok = function () {
		computers.checkIpAndPort({ip:$scope.computer.ip,port:$scope.computer.port}).then(function(data){
			if(!data){
				if(id!=undefined){
					computers.update({id:id,ip:$scope.computer.ip,port:$scope.computer.port,zone:$scope.computer.zone})
				}else{
					computers.add($scope.computer);
				}
    			$uibModalInstance.close();
			}else{
				alert("已经存在相同的ip和端口");
			}
		})
		
  	};
  	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  };
})
.controller("linkRouteCtl",function($scope,$rootScope,$uibModal,nav,computers,linkroutes,$q,$http,UserService){
	UserService.getLoginUser().then(function(data){
		$scope.logUser=data;
	});
	nav.setCurrent('linkroute');
	$rootScope.nav = nav;

	linkroutes.request($scope.key).then(function(result){
		$scope.links = result;
	});
	/*$scope.links=linkroutes.getList();*/
	$scope.pageChanged=function(){
		linkroutes.request($scope.key);
	}
	
	$scope.refresh = function(){
		linkroutes.request($scope.key);
	}

	$scope.selected=[];	
	$scope.isSelected=function(id){
		return $scope.selected.indexOf(id)>=0;

	}
	$scope.selectAll = selectAll;
	$scope.flag=false;
	function selectAll(){
		if($scope.flag){
			$scope.selected=[];
			$scope.url='';
		}else{
			const temp = [];
			$scope.links.data.map(function(item){
				temp.push(item.id);
			})
			$scope.selected=temp;
			genUrl($scope.selected);
		}
		$scope.flag=!$scope.flag;
	}
	$scope.select=function($event,id){
		var checkbox = $event.target;
		if(checkbox.checked && $scope.selected.indexOf(id)==-1){
			$scope.selected.push(id);
		}
		if(!checkbox.checked && $scope.selected.indexOf(id)!=-1){
			var index = $scope.selected.indexOf(id);
			$scope.selected.splice(index,1);
		}
		genUrl($scope.selected);

	}
	var genUrl = function (ids){
		var url = "link/export.do?"
			for(var i=0 ; i < $scope.selected.length;i++){
				url+="ids="+$scope.selected[i]+"&"	;
			}
				$scope.url = url.substr(0,url.length-1);
	}
	$scope.export=function(){
		
		if($scope.selected.length==0){
			alert("请选择")
		}else{
			angular.element("#export").click();
		}
	}
	
	$scope.deleteLink = function(link){
		if(confirm("确定删除吗？")){
			linkroutes.deleteLink(link);	
		}
	}

	$scope.open = function (id) {
		$http({
		method:"get",
		url:"computer/getAll.do",
		}).success(function(result){
			if(result!=''){
				var modalInstance = $uibModal.open({
      			animation: $scope.animationsEnabled,
      			templateUrl:"templates/linkEdit.html",
      			controller:"linkEditCtl",
      			animation:true,
				resolve:{
        			id: function () {
          				return id;
        			}
      			}
				})
			}
			else alert("请先添加机器！")
		})
		
	}

	/*$scope.page=linkroutes.page;*/
})

.controller("linkEditCtl",function($uibModalInstance,$scope,linkroutes_form,id,computers,$http,linkroutes){
	//linkid为空为新增，否则为编辑
	
	$http({
			method:"get",
			url:"link/getOne.do",
			params:{
				entity:id
			}
	}).then(function(result){
			$scope.link = result.data;
			
	
	if(id!=undefined){
		$scope.operate='1';
		linkroutes_form.setPaths($scope.link);
	}else{
		$scope.operate='0';
		$scope.link={id:"",name:"",path:[]};
		linkroutes_form.initAdd();
	}
	$scope.path = linkroutes_form.getPaths();
	$scope.buttonClick=linkroutes_form.buttonClick;
	$scope.buttonType = linkroutes_form.buttonType;
	//$scope.computers  = computers.getList();
	/*$http({
		method:"get",
		url:"computer/getAll.do",
	}).success(function(result){
		$scope.computers = JSON.parse(result);
	})*/
	computers.getAll().then(function(result){
		$scope.computers = JSON.parse(result);
	})

	$scope.min = linkroutes_form.min;
	$scope.change = linkroutes_form.change;
	$scope.ok = function () {
		var path = linkroutes_form.getPaths();
		for(var i=0;i<path.length;i++){
			if(path[i]==0) {
				//path.splice(i,1);
				alert("添加失败，请选择机器");
				return;
			} 
		}
		//linkroutes_form.save($scope.link);
		if(id!=undefined){
			linkroutes.checkName({id:$scope.link.id,name:$scope.link.name}).then(function(data){
				if(!data){
					linkroutes.update({id:$scope.link.id,name:$scope.link.name,path:linkroutes_form.getPaths()})
					$uibModalInstance.close();
				}else{
					alert("链路名称已经存在");
				}
			})
			
		}else{
			linkroutes.checkName({id:"",name:$scope.link.name}).then(function(data){
				if(!data){
					linkroutes.add({id:"",name:$scope.link.name,path:linkroutes_form.getPaths()});
					$uibModalInstance.close();
				}else{
					alert("链路名称已经存在");
				}
			})
		}
    	
  	};

  	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
  })	
})

.controller("userCtl",function($scope,$rootScope,$uibModal,nav,UserService,permissionService ,$location){
	UserService.getLoginUser().then(function(data){
		$scope.logUser=data;
	});
	nav.setCurrent('user');
	$rootScope.nav = nav;

	UserService.request($scope.key).then(
		function(_users){
			$scope.users=_users;
		})
	$scope.pageChanged=pageChanged;
	$scope.refresh = refresh;
	$scope.deleteUser = deleteUser;
	$scope.open = open;

	$scope.loginUser = loginUser;
	$scope.loginError=false;

	function loginUser(){
		var username = $scope.name;
		var password = $scope.password;
		UserService.login(username,password).then(function(permission){
			if(permission==""){
				$scope.loginError = true
			}else{
				permissionService.setPermission(permission);
				UserService.getLoginUser().then(function(data){
					UserService.loginUser = data;
					$scope.loginError=false;
					$location.path('/home')
				})
				
			}
			
			
		},function(error){$scope.error="登录失败"})
	}

	function pageChanged(){
		UserService.request($scope.key);
	}
	function refresh(){
		UserService.request($scope.key);
	}
	function deleteUser(_id){
		if(confirm("确定删除吗？")){
			UserService.deleteUser({id:_id});
		}
	}
	function open(id) {
		var modalInstance = $uibModal.open({
      		animation: $scope.animationsEnabled,
      		templateUrl:"templates/userEdit.html",
      		controller:"userEditCtl",
      		animation:true,
			resolve:{
        		id: function () {
          			return id;
        		}
      		}
		})
	}
})
.controller("userEditCtl",function($uibModalInstance,$scope,id,UserService,$http){

	if(id!=undefined) $scope.operate='1'
	else $scope.operate='0';
	$http({
		method:"get",
		url:"user/getOne.do",
		params:{
				entity:id
			}
	}).then(function(result){
		if(result.data!=undefined||result.data!=null||result.data!=""){
			$scope.user = result.data;
			$scope.password = result.data.password
		}else{
			$scope.user = null;
		}
	})
	
	$scope.ok = function () {
				if(id!=undefined){
					if($scope.password==$scope.user.password) $scope.user.password="";

					UserService.checkUsername({name:$scope.user.name,password:$scope.user.password,id:id}).then(function(data){
						if(data){
							alert("用户名已经存在")
						}else{
							UserService.update({id:id,name:$scope.user.name,password:$scope.user.password})
							$uibModalInstance.close();
						}
    					
					})
					
				}else{
					UserService.checkUsername({name:$scope.user.name,password:$scope.user.password,id:id}).then(function(data){
						if(data){
							alert("用户名已经存在")
						}else{
							UserService.add($scope.user);
							$uibModalInstance.close();
						}
    					
					})
				}
				
		
  	};
  	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  };
})
