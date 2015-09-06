angular
.module( "networkTroubleshooter")
.controller('profileController', ['$scope', 'ProfilePatterns', function( $scope, ProfilePatterns ){
	$scope.profileFields = [
		{
			name: '真實姓名',
			value: '陳耘志'
		},
		{
			name: '學號',
			value: 'B039020741'
		},
		{
			name: '房號',
			value: '239'
		},
		{
			name: '電話',
			value: '0988s282193'
		}
	];
	$scope.profilePatterns = ProfilePatterns;

	// $scope.profile = getProfile('user').setCache('xxProfile');

	$scope.updateProfile = function () {

		// if( getCache('xxProfile') == $scope.profile ){
		// 	// do http request
		// }
		// else {
		// 	// do nothing
		// }
	};
}]);