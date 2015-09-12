angular
.module( "networkTroubleshooter")
.controller( "loginController", function( $scope, $facebook , $q , $location , User ){
	
	$scope.FBLogin = function () {

		console.log("Facebook____Login");

		$facebook.login()
		.then(
			function(response) {
				if (response.authResponse) {
					return User.login( $scope );
				} else {
					return $q.reject('User cancelled login or did not fully authorize.');
				}
			},
			function (rejection) {
				console.log('Facebook____Login__Failed! ', rejection);			
			}
		).then(

		null, /* If success, do nothing */

		function (rejection) {
			console.log("Facebook____Login__Failed!! " , rejection);
			$location.path('/');
		});
	};
});
