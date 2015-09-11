angular
.module( "networkTroubleshooter")
.controller('profileController', ['$scope', '$routeParams', 'Profile','User', function( $scope, $routeParams, Profile, User ){

	$scope.profile = {};

	User.getProfile().then(function (profile) {
		$scope.profile = profile;
	});

	$scope.fieldMappings = Profile.mappings;
	$scope.profilePatterns = Profile.patterns;

	$scope.submitted = false;

	$scope.submissionStatus = '';

	$scope.updateProfile = function (form) {
		if( form.$valid && User.checkProfileUpdated($scope.profile) ){
			$scope.submissionStatus = 'pending';
			User.setProfile($scope.profile).then(function () {
				$scope.submissionStatus = 'done';
			});
		}
		else{
			$scope.submitted = true;
		}	

	};
}]);