angular
.module( "networkTroubleshooter")
.factory('User', ['$facebook','$q', 'UserIdentity', 'Request', function( $facebook, $q, UserIdentity, Request ){
    
    var identity = UserIdentity.NotLoggedIn;
    var profilePromise = undefined;
    var profile = {};
    return {
    	hasLoggedIn: function () {
            return identity != UserIdentity.NotLoggedIn;
        },
        hasRegistered: function () {
            return identity == UserIdentity.LoggedInNotRegistered;
        },
        loginBackend: function (userFacebookCredential) {
            return Request.login(userFacebookCredential).then(function (response) {
                console.log("Login Backend response: ",response);
                if( !response.data.registered ){
                    identity = UserIdentity.LoggedInNotRegistered;
                }
                else{
                    identity = UserIdentity.LoggedIn;
                }
            });
        },
        setIdentity: function (_identity) {
            identity = _identity;
        },
        setProfile: function (_profile) {
            profile = _profile;
            Request.updateUserProfile().then(function () {
               console.log("Successfully update user profile"); 
            });
        },
        getIdentity: function () {
        	return identity;
        },
        getProfile: function () {
            return profile;
        },
        initializeProfile: function() {
            if(!profilePromise || !authenticated) {
                var _user = this.getUser;
                profilePromise = Request.initializeUserProfile().then(
                function(response) {
                    console.log("Successfully retrieving profile from backend",response);
                    profile = response.data;
                    identity = UserIdentity.LoggedIn;
                    // Send user's profile to Main controller
                    return profile;
                },function(rejection) {  // error
                    console.log("Fail retrieving profile from backend");
                    return $q.reject(rejection);
                });
            }
            return profilePromise;
        },
        getNavBarLayout: function () {
            var navbarLayout = {};

            navbarLayout[UserIdentity.NotLoggedIn] = [
                { 
                    title: '登入',
                    url: '/#/login'
                }
            ];
            navbarLayout[UserIdentity.LoggedIn] = [
                { 
                    title: '登出',
                    url: '/#/logout'
                }
            ];

            navbarLayout[UserIdentity.LoggedInNotRegistered] = navbarLayout[UserIdentity.LoggedIn];

            return navbarLayout;
        }
    };

}]);
