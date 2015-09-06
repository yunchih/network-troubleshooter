angular
.module( "networkTroubleshooter")
.controller('profileController', function($scope){
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
	$scope.patterns = {
		'電話': /^\d{10}$/i,
		'房號': /^\d{3}$/i,
		'學號': /^\w\d{8}$/i,
		'email':  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	};

	// $scope.profile = getProfile('user').setCache('xxProfile');

	$scope.updateProfile = function () {
		
		// if( getCache('xxProfile') == $scope.profile ){
		// 	// do http request
		// }
		// else {
		// 	// do nothing
		// }
	};
});