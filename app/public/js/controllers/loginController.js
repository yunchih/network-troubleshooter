angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope , $facebook , $location, UserIdentity ){

	function getUserFacebookInfo () {
		$facebook.api("/me").then( 
			function(response) {

				var data = { identity: UserIdentity.authenticatedUser };

				angular.extend(data, response);
				
				$scope.setCurrentUser(data);

			},
			function(err) {
				$location.path('/');
			}
		);
		/*
		$facebook.api("/me").then( 
			function(response) {
				Request.getJWT(response.id).then(
				// OK
				function (res) {

				}, 
				// Error
				function () {
					
				})
			},
			function(err) {
				$location.path('/');
			}
		);
*/
	}
		
	$scope.FBLogin = function () {
		$facebook.login().then(function() {
			getUserFacebookInfo();
	    }, function () {
			$location.path('/');
		});
	};
});
