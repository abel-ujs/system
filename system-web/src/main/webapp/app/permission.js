angular.module("link.permission",[])

.factory("permissionService",["$rootScope",function($rootScope,$q){
	const service={};
	service.setPermission = setPermission;
	service.hasPermission = hasPermission;
	service.hasLogin = hasLogin;
	service.permissionList = [];
	return service;

	function setPermission (permissions){
		this.permissionList = permissions;
		$rootScope.$broadcast('permissionsChanged');
	}
	function hasPermission(permission){
		for(var i=0;i<this.permissionList.length;i++){
			if(this.permissionList[i]==permission){
				return true; 
			}
		}
		return false;
	}
	function hasLogin(){
		return this.permissionList!=undefined && this.permissionList != null && this.permissionList.length>0;
	}
}])
.directive("hasPermission",function(permissionService){
	return {
		restrict:'A',
		link: function(scope, element, attrs) {
			if(!typeof(attrs.hasPermission))
				throw "hasPermission value must be a string";
			const value = attrs.hasPermission.trim();
			const notPermissionFlag = value[0] === '!';
			if(notPermissionFlag) {
				value = value.slice(1).trim();
			}
			toggleVisibilityBasedOnPermission();
			scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
			function toggleVisibilityBasedOnPermission() {
				var hasPermission = permissionService.hasPermission(value);
				if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
					element.show();
				else
					element.hide();
				}
			}
			
	};
})