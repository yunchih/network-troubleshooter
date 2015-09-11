angular
.module( "networkTroubleshooter")
.service('User', 
    [ '$rootScope', '$facebook','$q', 'Identity', 'Request', 'Session', 
    function( $rootScope, $facebook, $q, Identity, Request, Session ){
    
    var authorizedBy;
    var status = Identity.status.NotRegistered;
    var profilePromise = undefined;
    var profile = {};

    var loginBackend  = function(getFacebookProfilePromise, fb_access_token) {
        return getFacebookProfilePromise.then( function (FBidentity) {
            
            var userFacebookCredential = {
                access_token: fb_access_token, 
                fb_id: FBidentity.fb_id 
            };

            return Request.login(userFacebookCredential).then(
                function (response) {

                    Session.store( response.data.access_token, fb_access_token );

                    if( !response.data.registered ){
                        status = Identity.status.NotRegistered;
                        $location.path('/#/profile');
                    }
                    else {
                        status = Identity.status.Registered;
                        // Take the user back to where he used to be.
                        $location.path( $rootScope.savedLocation );
                    }
                }, 
                function (rejection) {
                    console.log("Login Backend Failed! ",rejection);
                }
            );

            /* No handler function for failure (it's been checked in previous promise chain) */
        }, null);
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
    this.login = function (fb_access_token) {
        var promise = getFacebookProfile().then(
            function (FBidentity) {
                $rootScope.setCurrentUser(FBidentity);
                return FBidentity;
            },
            function () {
                $rootScope.setCurrentUser({});
            }
        );

        fb_access_token = fb_access_token || Session.fb_token;

        return loginBackend( promise, fb_access_token );
    };

    this.logout = function () {
        authorizedBy = Identity.authorizedBy.None;
        status = Identity.status.NotRegistered;
        profile = {};
        $location.path('/#/');
    };

    this.getProfile = function () {
        if( this.profile ){
            return Request.getUserProfile().then(function (res) {
                profile = res.data;
                return profile;
            });
        }
        else {
            return this.profile;
        }
    };
    this.checkProfileUpdated = function(_profile) {
        var newProfileFields = Object.getOwnPropertyNames(this.profile);
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
        return Request.updateUserProfile().then(function () {
           console.log("Successfully update user profile"); 
        });
    };

    this.getIdentity = function () {
        return authorizedBy;
    }
    this.canAccessRestrictedRoute = function () {
        return authorizedBy != Identity.authorizedBy.None;
    }

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

    navbarLayout[Identity.authorizedBy.BackendB] = navbarLayout[Identity.authorizedBy.F];

    this.getNavbarLayout = function () {
        return navbarLayout[ authorizedBy ];
    };

}]);
