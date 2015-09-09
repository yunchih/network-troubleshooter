angular
.module( "networkTroubleshooter")
.controller('profileController', ['$scope', '$routeParams', 'Profile','User', function( $scope, $routeParams, Profile, User ){

	$scope.profile = {};

	User.getProfile().then(function (profile) {
		$scope.profile = profile;
	});

	$scope.fieldMappings = Profile.mappings;
	$scope.profilePatterns = Profile.patterns;

	$scope.updateProfile = function () {
		User.setProfile($scope.profile);
	};
}]);