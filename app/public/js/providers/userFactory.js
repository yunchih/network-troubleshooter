angular
.module( "networkTroubleshooter")
.factory('User', ['$facebook', 'UserIdentityConfig', function( $facebook, UserIdentityConfig ){
    
    var userIdentity = 'unauthenticated_user';

    var loadAuthenticatedUser = function () {
    	
    };

    return {
    	login: function () {
    		$facebook.login().then(function() {
		    	loadAuthenticatedUser();
		    });
    	},
        updateUserIdentity: function (identity) {
        	userIdentity = identity;
        }
    };

}]);
