angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope , $facebook , $location, UserIdentity ){

	function getUserFacebookInfo () {
		$facebook.api("/me").then( 
			function(response) {
				Request.getUserProfile(response.id).then(
				// OK
				function () {
					
				}, 
				// Error
				function () {
					
				})
			},
			function(err) {
				$location.path('/');
			}
		);
	}
		
	$scope.FBLogin = function () {
		$facebook.login().then(function() {
			getUserFacebookInfo();
	    }, function () {
			$location.path('/');
		});
	};
});
