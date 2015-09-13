angular
.module( "networkTroubleshooter")
.service('User', 
    [ '$rootScope', '$facebook','$q','$location', 'Identity', 'Request', 'Session', 
    function( $rootScope, $facebook, $q, $location, Identity, Request, Session ){
    
    var authorizedBy,
        registered = false,
        profile = {};

/*
 *
 *  Configuring Navigation bar layout
 *
 */

    var navbarLayout = {};

    navbarLayout[Identity.authorizedBy.None] = [
        { 
            title: '登入',
            url: '/#/login'
        }
    ];
    navbarLayout[Identity.authorizedBy.FB] = [
        { 
            title: '登出',
            url: '/#/logout'
        }
    ];

    navbarLayout[Identity.authorizedBy.Backend] = navbarLayout[Identity.authorizedBy.FB];

    var loginBackend  = function(getFacebookProfilePromise) {
        return getFacebookProfilePromise
    };
    var getFacebookProfile = function () {
        return $facebook.api("/me").then(
            function (res) {
                authorizedBy = Identity.authorizedBy.FB;
                return { 
                    name: res.name,
                    fb_id: res.id
                };
            },
            function (res) {
                authorizedBy = Identity.authorizedBy.None;
                return {};
            }
        );
    };
    var setCurrentUser = function ($scope, user) {
        $scope.currentUser = user;
        $scope.navBar = navbarLayout[ authorizedBy ];
    };

    var loginBackend = function (userFacebookCredential) {
        return Request.login(userFacebookCredential).then(
            function (response) {

                Session.store( response.data.access_token, userFacebookCredential.access_token );

                if( !response.registered ){
                    registered = false;
                    $location.path('termOfService');
                }
                else {
                    registered = true;
                    // Take the user back to where he used to be.
                    $location.path( $rootScope.savedLocation );
                }
            },
            function (rejection) {
                console.log("Login Backend Failed! ",rejection);
            }
        );
    };

    this.agreeTermOfService = false;

    this.login = function ($scope) {
        var loginPromise = getFacebookProfile().then(
            function (FBidentity) {
                setCurrentUser($scope, FBidentity);

                var FacebookAuthResponse = $facebook.getAuthResponse();
                var userFacebookCredential = {
                    access_token: FacebookAuthResponse.accessToken,
                    fb_id: FacebookAuthResponse.userID 
                };

                if( !userFacebookCredential.access_token || !userFacebookCredential.fb_id )
                    return $q.reject();

                console.log("User credential", userFacebookCredential);
                return loginBackend(userFacebookCredential);
            },
            function () {
                setCurrentUser($scope, {});
                return $q.reject();
            }
        );
        
        return loginPromise;
    };

    this.logout = function () {
        authorizedBy = Identity.authorizedBy.None;
        registered = false;
        profile = {};
        $location.path('/');
    };

    this.getProfile = function () {
        if( !registered )
            return $q.when({}); 

        if( !this.profile ){
            return Request.getUserProfile().then(function (res) {
                profile = res.data;
                return profile;
            });
        }
        else {
            return $q.when(this.profile); 
        }
    };
    this.checkProfileUpdated = function(_profile) {

        var newProfileFields = Object.getOwnPropertyNames(profile);
        var oldProfileFields = Object.getOwnPropertyNames(_profile);

        if (newProfileFields.length != oldProfileFields.length) {
            return true;
        }

        for (var i = 0; i < newProfileFields.length; i++) {
            var field = newProfileFields[i];

            if (this.profile[field] !== _profile[field]) {
                return true;
            }
        }

        return false;
    };
    this.setProfile = function (_profile) {
        profile = _profile;
        return Request.updateUserProfile(_profile).then(function () {
           console.log("Successfully update user profile"); 
        });
    };

    this.getIdentity = function () {
        return authorizedBy;
    };

    this.canAccessRestrictedRoute = function () {
        return authorizedBy != Identity.authorizedBy.None;
    };

}]);
