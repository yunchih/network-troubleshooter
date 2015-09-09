angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope, $rootScope , $facebook , $location , User ){

	function getUserFacebookInfo (fb_access_token) {
		$facebook.api("/me").then( 
			function(response) {
				// Set User's FB Data
				// which contains { name: 'xxx', id: 'xxx' }
				$scope.setCurrentUser({ 
					name: response.name,
					fb_id: response.id 
				});

				var userFacebookCredential = {
					access_token: fb_access_token, 
					fb_id: response.id 
				};

				User.loginBackend(userFacebookCredential).then(
					function (response) {
						
						Session.store( response.data.access_token );

						if( !response.data.registered ){
							$location.path('/profile');
						}
						else {
							// Take the user back to where he used to be.
							$location.path( $rootScope.savedLocation );
						}
					},
					function (rejection) {
						console.log("Invalid Facebook Credential!  Rejection message: ", rejection);
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

		console.log("Facebook____Login");

		$facebook.login().then(
			function(response) {
			   if (response.authResponse) {
					var access_token = $facebook.getAuthResponse()['accessToken'];
					getUserFacebookInfo(access_token);
			   } else {
			    	console.log('User cancelled login or did not fully authorize.');
			   }
			}, 
			function (rejection) {
				console.log("Facebook login failed: ", rejection);
			}
		);
	};
});
