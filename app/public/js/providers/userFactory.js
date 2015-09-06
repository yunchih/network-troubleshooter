angular
.module( "networkTroubleshooter")
.factory('User', ['$facebook', 'UserIdentity', 'Session', function( $facebook, UserIdentity, Session ){
    
    var authenticated = false;
    var profilePromise = undefined;
    var profile = null;
    return {
    	hasLoggedIn: function () {
            return loggedIn;  
        },
        getIdentity: function (_profile) {
        	return _profile ? UserIdentity.unauthenticatedUser : UserIdentity.unauthenticatedUser;
        },
        getProfile: function() {
            if(!profilePromise || !authenticated) {
                profilePromise = Request.getUserProfile().then(
                function(response) {
                    authenticated = true;
                    profile = response.data;
                    return profile;
                },function(rejection) {  // error
                    authenticated = false;
                    return $q.reject(rejection);
                });
            }
            return profilePromise;
        }
    };

}]);
