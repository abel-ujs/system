(function(){

angular
	.module("link.services",[])
	.factory('ComputerService',ComputerService)
	ComputerService.$inject=['$http'];
	function ComputerService($http){
		var service={};
		service.getAll = getAll;
		service.computers={result:[],page:{
			current:1,
			total:0,
			size:10
		}}
		return service;
		function getAll(){
			return $http({
				method:'get',
				url:'computer/getAll.do',
				params:{
					current:this.service.computers.current,
					size:this.service.computers.size
				}
			}).then(function(res){return res.data})
		}
	}

})()