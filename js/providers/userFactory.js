angular
.module( "networkTroubleshooter")
.service('User', ['$facebook','$q', 'Identity', 'Request', function( $facebook, $q, Identity, Request ){
    
    this.authorizedBy = Identity.authorizedBy.None;
    this.status = Identity.status.NotRegistered;
    this.profilePromise = undefined;
    this.profile = {};

    this.getFacebookProfile: function () {
        return $facebook.api("/me").success(function (res) {
            authorizedBy = Identity.authorizedBy.FB;
            return { 
                name: response.name,
                fb_id: response.id 
            }); 
        });
    },
    this.loginBackend: function (userFacebookCredential) {
        return Request.login(userFacebookCredential).success(function (response) {
            if( !response.data.registered ){
                identity = Identity.status.Registered;
            }
            else{
                identity = Identity.status.NotRegistered;
            }
        });
    },

    this.setProfile: function (_profile) {
        profile = _profile;
        return Request.updateUserProfile().then(function () {
           console.log("Successfully update user profile"); 
        });
    },

/*
 *
 *  Configuring Navigation bar layout
 *
 */

    var navbarLayout = {};

    navbarLayout[UserIdentity.authorizedBy.None] = [
        { 
            title: '登入',
            url: '/#/login'
        }
    ];
    navbarLayout[UserIdentity.authorizedBy.FB] = [
        { 
            title: '登出',
            url: '/#/logout'
        }
    ];

    navbarLayout[UserIdentity.authorizedBy.FB] = navbarLayout[UserIdentity.authorizedBy.Backend];

    this.navbarLayout = navbarLayout;

}]);
