angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope, $rootScope , $facebook , $q , $location , User ){

	function getUserFacebookInfo (fb_access_token) {
		return User.getFacebookProfile().success(function (FBidentity) {

	        $scope.setCurrentUser(FBidentity);

	        var userFacebookCredential = {
				access_token: fb_access_token, 
				fb_id: FBidentity.fb_id 
			};

			return User.loginBackend(userFacebookCredential).success(function (response) {
					
				Session.store( response.data.access_token );

				if( !response.data.registered ){
					$location.path('/profile');
				}
				else {
					// Take the user back to where he used to be.
					$location.path( $rootScope.savedLocation );
				}
			});

	    });
	}
		
	$scope.FBLogin = function () {

		console.log("Facebook____Login");

		$facebook.login()
		.success(function(response) {
			if (response.authResponse) {
					var access_token = $facebook.getAuthResponse()['accessToken'];
					return getUserFacebookInfo(access_token);
			   } else {
			    	return $q.reject('User cancelled login or did not fully authorize.');
			   }
			}
		).error(function (error) {
			console.log("Facebook____Login__Failed!! " , error);
			$location.path('/');
		});
	};
});
