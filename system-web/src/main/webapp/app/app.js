angular.module("link",["ngRoute","link.controllers","link.services","chieffancypants.loadingBar","ngAnimate"]).config(["$routeProvider","$locationProvider","$httpProvider",function($routeProvider,$locationProvider,$httpProvider,$scope){
	$routeProvider.when("/computer",{templateUrl:"templates/computer.html",controller:"computerCtl",permission:"login"});
	$routeProvider.otherwise({redirectTo:"/computer"});
}])
.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
})


angular.element(document).ready(function(){
	angular.bootstrap(document.body,['link']);
})