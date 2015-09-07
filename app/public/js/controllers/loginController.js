angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope , $facebook , $location , User , UserIdentity ){

	function getUserFacebookInfo () {
		$facebook.api("/me").then( 
			function(response) {
				// Set User's FB Data
				// which contains { name: 'xxx', id: 'xxx' }
				$scope.setCurrentUser(response);

				User.loginBackend().then(
					function (response) {
						
						Session.store( response.data.access_token );

						if( !response.registered ){
							$location.path('/profile');
						}
						else {
							$location.path('/');
						}
					},
					function () {
						console.log("checkRegistered Failed");
					}
				);
				
			},
			function(err) {
				// Fail to retrieve user data from FB
				$location.path('/');
			}
		);
	}
		
	$scope.FBLogin = function () {
		$facebook.login().then(function() {
			getUserFacebookInfo();
	    }, function () {
	    	// Fail to login to FB
			$location.path('/');
		});
	};
});
