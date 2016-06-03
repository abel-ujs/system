var permissionList;
angular.module("link",["ngRoute","link.controllers","link.services","link.permission","chieffancypants.loadingBar","ngAnimate"]).config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider,$scope){
	$routeProvider.when("/home",{templateUrl:"templates/home.html",controller:"homeCtl",permission:"login"});
	$routeProvider.when("/computer",{templateUrl:"templates/computer.html",controller:"computerCtl",permission:"login"});
	$routeProvider.when("/linkroute",{templateUrl:"templates/linkroute.html",controller:"linkRouteCtl",permission:"login"});
	$routeProvider.when("/user",{templateUrl:"templates/user.html",controller:"userCtl",permission:"admin"});
	$routeProvider.when("/login",{templateUrl:"templates/login.html",controller:"userCtl",permission:""});
	$routeProvider.when("/unAuth",{templateUrl:"templates/unAuth.html",permission:""});
	$routeProvider.otherwise({redirectTo:"/home"});
}])
.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
})

.run(function(permissionService){
	console.log("run",permissionList)
	permissionService.setPermission(permissionList);
})

angular.element(document).ready(function(){
	$.get("user/getPermission.do",function(data){
		permissionList = data;
		angular.bootstrap(document.body,['link']);
	})
})