/**
 * @author ahaha
 */
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
			var that = this;
			return $http({
				method:'get',
				url:'computer/getAll.do',
				params:{
					current:this.computers.page.current,
					size:this.computers.page.size
				}
			}).then(function(res){
				if(res.data.status=='200'){
					that.computers.page=res.data.page;
					that.computers.result = res.data.result;
				}
				return res.data
			})
		}
	}

})()