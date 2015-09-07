angular
.module( "networkTroubleshooter")
.factory('User', ['$facebook', 'UserIdentity', 'Request', function( $facebook, UserIdentity, Request ){
    
    var identity = User.NotLoggedIn;
    var profilePromise = undefined;
    var profile = {};
    return {
    	hasLoggedIn: function () {
            return identity == User.LoggedIn;
        },
        hasRegistered: function () {
            return identity == User.LoggedInNotRegistered;
        },
        loginBackend: function () {
            Request.login().then(function (response) {
                if( !response.registered ){
                    identity = User.LoggedInNotRegistered;
                }
                else{
                    identity = User.LoggedIn;
                }
            });
        },
        setIdentity: function (_identity) {
            identity = _identity;
        },
        setProfile: function (_profile) {
            profile = _profile;
        },
        getIdentity: function () {
        	return identity;
        },
        getProfile: function () {
            return profile;
        },
        initializeProfile: function() {
            if(!profilePromise || !authenticated) {
                profilePromise = Request.initializeUserProfile().then(
                function(response) {
                    profile = response.data;
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

            navbarLayout[User.NotLoggedIn] = [
                { 
                    title: '登入',
                    url: 'login'
                }
            ];
            navbarLayout[User.LoggedIn] = [
                { 
                    title: '個人資料',
                    url: 'profile'
                },
                { 
                    title: '登出',
                    url: 'logout'
                }
            ];

            navbarLayout[User.LoggedInNotRegistered] = navbarLayout[User.LoggedIn];

            return navbarLayout;
        }
    };

}]);
