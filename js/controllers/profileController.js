angular
.module( "networkTroubleshooter")
.controller('profileController', ['$scope', '$routeParams', 'Profile','User', function( $scope, $routeParams, Profile, User ){

	// Even if we got an empty object from 'User.getProfile()', 
	// Angular will still propogate any new edit onto the object.
	$scope.profile = User.getProfile();
	$scope.fieldMappings = Profile.mappings;
	$scope.profilePatterns = Profile.patterns;

	$scope.updateProfile = function () {
		User.setProfile($scope.profile);
	};
}]);