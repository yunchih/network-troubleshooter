angular
.module( "networkTroubleshooter")
.factory('Request',['$http', 'API', function($http, API){

	var apiURL = [ API.base , API.version, API.user.prefix ].join('/');

	return {
		getJWT: function (fbID) {
			return $http.get( apiURL + '?fb_id=' + fbID );
		},
		initializeUserProfile: function () {
			return $http({
			    method: 'GET',
			    url: apiURL + '/' + API.GetUserProfile,
			    ignoreExpiration: true
			});
		}
		getUserProfile: function () {
			return $http.get( apiURL + '/' + API.GetUserProfile );
		},
		getSingleUserProfile: function (prop, value) {
			var url = [ apiURL , API.GetSingleUserProfile , prop , value ].join.('/');
			return $http.get(url);
		},
		updateUserProfile: function (query) {
			return $http.post( apiURL + '/' + API.UpdateUserProfile, query );
		},
		updateSingleUserProfile: function (query, prop, value) {
			var url = [ apiURL , API.GetSingleUserProfile , prop , value ].join.('/');
			return $http.post( url , query );
		}
	};
}]);