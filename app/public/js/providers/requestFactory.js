angular
.module( "networkTroubleshooter")
.factory('Request',['$http', 'API', function($http, API){

	var apiURL = [ API.base , API.version, API.user.prefix ].join('/');
	
	return {
		getUserProfile: function () {
			return $http.get( apiURL + API.GetUserProfile );
		},
		getSingleUserProfile: function (prop, value) {
			return $http.get( [ apiURL , API.GetSingleUserProfile , prop , value ].join.('/') );
		},
		updateUserProfile: function (query) {
			return $http.post( apiURL + API.UpdateUserProfile, query );
		},
		updateSingleUserProfile: function (query, prop, value) {
			return $http.post( [ apiURL , API.GetSingleUserProfile , prop , value ].join.('/'), query );
		}
	};
}]);