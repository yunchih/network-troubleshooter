angular
.module( "networkTroubleshooter")
.factory('Request',['$http', 'API', 'Session', function($http, API, Session){

	var apiBase = [ API.base , API.version ].join('/');
	var api = API.api;
	
	var appendAccessToken = function (data) {
		data.acces_token = Session.token;
        return data;
	};

	var GET_request = function (url_body) {
		return $http({
			method: 'GET',
			url: apiBase + '/' + url_body,
			params: appendAccessToken({})
		});
	};

	var POST_request = function (url_body, data) {
		return $http({
			method: 'POST',
			url: apiBase + '/' + url_body,
			params: appendAccessToken(data)
		});
	};

	return {
		login: function (userCredential) {
			return POST_request( api.Login, userCredential );
		},
		updateUserProfile: function (profile) {
			return POST_request( api.UpdateUserProfile, profile );
		},
		updateSingleUserProfile: function (query, prop, value) {
			var url = [ api.UpdateSingleUserProfile , prop , value ].join('/');
			return POST_request( url , query );
		},
		initializeUserProfile: function () {
			return GET_request( api.GetUserProfile ); 
		},
		getUserProfile: function () {
			return GET_request( api.GetUserProfile );
		},
		getSingleUserProfile: function (prop, value) {
			var url = [ api.GetSingleUserProfile , prop , value ].join('/');
			return GET_request( url );
		}
	};
}]);