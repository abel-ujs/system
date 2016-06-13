(function(){
	angular
	.module("link.controllers",["link.services","ui.bootstrap"])
	.controller("computerCtl",function($scope,$uibModal,ComputerService){
		ComputerService.getAll();	
		$scope.computers = ComputerService.computers;
		$scope.pageChanged=pageChanged;
		function pageChanged(){
			ComputerService.getAll();
		}
	})
})()
