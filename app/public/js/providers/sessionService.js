angular
.module( "networkTroubleshooter")
.factory("Session", function ($cookieStore) {
	
	var token = $cookieStore.get('token');
	var userId = $cookieStore.get('id');
	var profilePromise = null;

	return {
		getToken: function () {
			return this.token || $cookieStore.get('token');
		},
		getID: function () {
			return this.userId || $cookieStore.get('id');
		},
		storeProfile: function ( _profilePromise ) {
			profilePromise = _profilePromise;
		}, 
		getProfile: function () {
			var actualProfile = {};
			profilePromise.then(function () {
				
			})
		}
		create: function (webToken, userId) {
			this.token = webToken;
			this.userId = userId;
			$cookieStore.put('token',webToken);
			$cookieStore.put('id',userId);
		},
		destroy: function () {
			this.token = null;
			this.userId = null;
			$cookieStore.remove('token');
			$cookieStore.remove('id');
		}
	}
		
		
});