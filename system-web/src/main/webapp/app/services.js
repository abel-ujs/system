(function(){


angular
.module("link.services",[])
.service("nav",function(){
	var current = "home";
	this.getCurrent = getCurrent;
	this.setCurrent = setCurrent;
	function getCurrent(){
		return current;
	}
	function setCurrent(cur){
		current = cur;
	}
})
.service("computers",function($http){
	/*var page={
		current:1,
		total:0,
		size:10
	};*/
	this.computers = {data:[],page:{
		current:1,
		total:0,
		size:10
	}};
	this.request = fetch;
	/*this.getList = getList;*/
	this.getOne = getOne;
	this.update = update;
	this.deleteComputer = deleteComputer;
	this.add = add;
	this.getPage = getPage;
	this.setPage = setPage;
	this.getAll = getAll;
	this.checkIpAndPort = checkIpAndPort;
	function checkIpAndPort(computer){
		return $http({
			method:"get",
			url:"computer/checkIpAndPort.do",
			params:{
				entity:computer
			}
		}).then(function(res){return res.data});
	}
	function getAll() {
		return $http({
			method:"get",
			url:"computer/getAll.do",
		}).then(function(res){return res.data});
	}

	function fetch(key){
		var that = this;
		return $http({
			method:"get",
			url:"computer/getList.do",
			params:{
				current:this.computers.page.current,
				size:this.computers.page.size,
				key:key
			}
		}).then(function(result){
			return processResult.bind(that)(result);
		})
	}
	function processResult(result){
		var _result = JSON.parse(result.data)
		var _computers=JSON.parse(_result.data);
		var _page = JSON.parse(_result.page);
		this.computers.data=_computers;
		this.computers.page=_page;
		return this.computers;
	}

	function getList(){
		return computers;
	}

	function getOne(id){
		var url = "computer/getOne.do";
		
	}
	function update(computer){
		_updateToServer.bind(this)(computer);
	}
	function deleteComputer(computer){
		_deletToServer.bind(this)(computer);
	}
	function add(computer){
		_addToServer.bind(this)(computer);
	}
	function _updateToServer(computer){
		var url = "computer/update.do";
		process.bind(this)(url,computer);
	}
	function _deletToServer(computer){
		var url="computer/delete.do";
		process.bind(this)(url,computer.id);
	}
	function _addToServer(computer){
		var url = "computer/add.do";
		process.bind(this)(url,computer);
	}
	function process(url,entity){
		var that = this;
		$http({
			method:"get",
			url:url,
			params:{
				entity:entity
			}
		}).success(function(){
			fetch.bind(that)();
		})
	}
	function getPage(){
		return page ;
	}
	function setPage(page){
		page = page ;
	}
})
.service("linkroutes",function(computers,$http,$q){

	this.linkroutes = {data:[],page:{
		current:1,
		size:10,
		total:100,
	}};
	this.request = fetch;
	this.isActive = isActive;
/*	this.getList = getList;*/
	this.update = update;
	this.deleteLink = deleteLink;
	this.add = add;
	/*this.page = page;*/
	this.checkName = checkName;
	function checkName(link){
		return $http({
			method:'get',
			url:"link/checkName.do",
			params:{
				link:link
			}
		}).then(function(res){return res.data});
	}

	function fetch(key){
		var that = this;
		return $http({
			method:"get",
			url:"link/getList.do",
			params:{
				current:this.linkroutes.page.current,
				size:this.linkroutes.page.size,
				key:key
			}
		}).then(function(result){
			return processResult.bind(that)(result);
		})
	}
	function processResult(result){
		var _result = JSON.parse(result.data)
		var _links=JSON.parse(_result.data);
		var _page = JSON.parse(_result.page);
		this.linkroutes.data=_links;
		this.linkroutes.page=_page;
		return this.linkroutes;
	}

	function isActive(computer){
		return $http({
			method:"get",
			url:"computer/isActive.do",
			params:{
				id:computer.id
			}
		})
	}

	function getList(){
		return linkroutes;
	}
	
	function update(link){
		_updateToServer.bind(this)(link);
	}
	function deleteLink(link){
		_deletToServer.bind(this)(link);
	}
	function add(link){
		_addToServer.bind(this)(link);
	}
	function _updateToServer(link){
		var url = "link/update.do";
		process.bind(this)(url,link);
	}
	function _deletToServer(link){
		var url="link/delete.do";
		process.bind(this)(url,link.id);
	}
	function _addToServer(link){
		var url = "link/add.do";
		process.bind(this)(url,link);
	}
	function process(url,entity){
		var that = this;
		$http({
			method:"get",
			url:url,
			params:{
				entity:entity
			}
		}).success(function(){
			fetch.bind(that)();
		})
	}
})

.service("linkroutes_form",function(linkroutes){
	var path = [0];
	this.buttonClick=function(index){
		var type = this.buttonType(index)
		if(type){
			path.splice(index+1,0,"0")
		}else{
			path.splice(index,1);
		}
	}
	this.getPaths = function(){
		return path;
	}
	this.setPaths=function(link){
		path=link.path.split(",");

	}
	this.initAdd = function(){
		path=[0];
	}
	this.buttonType = function(index){
		//true为添加，false为删除
		if((index==path.length-1)&&index<2) return true;
		else return false;
	}
	this.min=function(index){
		path.splice(index,1);
	}
	this.save = function(link){
		for(p in path){
			if(path[p]==0) 
				path.splice(p,1)
		}
		link.path=path;
		if(link.id==""||link.id==undefined){
			linkroutes.add(link)
		}else{
			linkroutes.update(link);
		}
	}
	//选择机器
	this.change = function(index,id){
		path[index]=id;
	}


})

.factory('UserService',UserService);
UserService.$inject = ['$http']
function UserService($http){
	var service = {};
	service.getUser = getUser;
	service.users = {data:[],page:{
		current:1,
		total:0,
		size:10
	}};
	service.loginUser = {};
	service.request = fetch;
	service.getOne = getOne;
	service.update = update;
	service.deleteUser = deleteUser;
	service.add = add;
	service.getPage = getPage;
	service.setPage = setPage;
	service.checkUsername = checkUsername;
	service.login = login;
	service.logOff = logOff;
	service.getLoginUser = getLoginUser;
	service.changePassword= changePassword;
	return service;
	
	function changePassword(password){
		return $http({
			method:'get',
			url:'user/changePassword.do',
			params:{
				password:password
			}
		}).then(function(res){return res.data})
	}

	function getLoginUser(){
		return $http({
			method:'get',
			url:'user/getLoginUser.do'
		}).then(function(res){
			return res.data;
		})
	}
	function logOff(){
		return $http({
			method:"get",
			url:"user/logout.do",
		}).then(function(res){return res.data});
	}
	function login(username,password){
		return $http({
			method:"post",
			url:"user/login.do",
			params:{
				user:JSON.stringify({name:username,password:password})
			}
		}).then(function(res) {
			return res.data;
		},function(res) {
			return res;
		})
	}

	function getUser(){
		return $http.get("user/getOne.do",{
			params:{
				id:1
			}
		}).then(handleSuccess, handleError('Error getting  user'));
	}
	function handleSuccess(res) {
            return res.data;
        }
 
    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

	function fetch(key){
		var that = this;
		return $http({
			method:"get",
			url:"user/getList.do",
			params:{
				current:this.users.page.current,
				size:this.users.page.size,
				key:key
			}
		}).then(function(result){
			return processResult.bind(that)(result);
		})
	}
	function processResult(result){
		if(result.data=='') return ;
		var _result = JSON.parse(result.data)
		var _users=JSON.parse(_result.data);
		var _page = JSON.parse(_result.page);
		this.users.data=_users;
		this.users.page=_page;
		return this.users;
	}

	function getOne(id){
		var url = "user/getOne.do";
		
	}
	function update(user){
		_updateToServer.bind(this)(user);
	}
	function deleteUser(user){
		_deletToServer.bind(this)(user);
	}
	function add(user){
		_addToServer.bind(this)(user);
	}
	function _updateToServer(user){
		var url = "user/update.do";
		process.bind(this)(url,user);
	}
	function _deletToServer(user){
		var url="user/delete.do";
		process.bind(this)(url,user.id);
	}
	function _addToServer(user){
		var url = "user/add.do";
		process.bind(this)(url,user);
	}
	function process(url,entity){
		var that = this;
		$http({
			method:"get",
			url:url,
			params:{
				entity:entity
			}
		}).success(function(data){
			if(!data){
				alert("操作失败！")
			}
			else{
				fetch.bind(that)();	
			}
			
		}).error(function(){alert("操作失败！")})
	}
	function getPage(){
		return page ;
	}
	function setPage(page){
		page = page ;
	}
	function checkUsername(user){
		return $http({
			method:"get",
			url:'user/checkUsername.do',
			params:{
				user:user
			}
		}).then(function(result){return result.data});

	}
}



})()