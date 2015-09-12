angular
.module( "networkTroubleshooter")
.controller('termOfServiceController', 
	['$scope', 'User', 
	function( $scope, User ){

	$scope.agree = function () {
		User.agreeTermOfService = true;		
	};

}]);