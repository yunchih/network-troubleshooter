angular
.module( "networkTroubleshooter")
.service('User', ['$facebook','$q', 'Identity', 'Request', function( $facebook, $q, Identity, Request ){
    
    

    
    this.authorizedBy = Identity.authorizedBy.None;
    this.status = Identity.status.NotRegistered;
    this.profilePromise = undefined;
    this.profile = {};

    this.getFacebookProfile = function () {
        return $facebook.api("/me").then(function (res) {
            authorizedBy = Identity.authorizedBy.FB;
            return { 
                name: res.name,
                fb_id: res.id 
            }; 
        });
    };
    this.loginBackend = function (userFacebookCredential) {
        return Request.login(userFacebookCredential).success(function (response) {
            if( !response.data.registered ){
                identity = Identity.status.Registered;
            }
            else{
                identity = Identity.status.NotRegistered;
            }
        });
    };
    this.getProfile = function () {
        if( this.profile ){
            return Request.getUserProfile().success(function (res) {
                this.profile = res.data;
                return this.profile;
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
        return this.authorizedBy;
    }
    this.canAccessRestrictedRoute = function () {
        return this.authorizedBy != Identity.authorizedBy.None;
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

    navbarLayout[Identity.authorizedBy.FB] = navbarLayout[Identity.authorizedBy.Backend];

    this.navbarLayout = navbarLayout;

}]);
