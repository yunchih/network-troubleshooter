'use strict';


var troubleshooterApp = 
angular
.module( "networkTroubleshooter", [
    "ngSanitize", 
    "ngAnimate", 
    "ngRoute",
    "ngFacebook", 
    "ngCookies",
    "angularAwesomeSlider"] )
.config(['$routeProvider','$locationProvider','$httpProvider', '$facebookProvider', function ($routeProvider, $locationProvider, $httpProvider, $facebookProvider) {

    $facebookProvider
        .setAppId(475318909316785);

    $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html'
            resolve: {
                UserProfile: function (User) {
                    return User.getProfile();                    
                }
            }
        })
        .when('/:page', {
            templateUrl: function (param) {
                return 'partials/' + param.page + '.html';
            }
        });

    $httpProvider.interceptors.push(['$q', '$location', 'Session', function ($q, $location, Session) {
        return {
            'request': function (config) {
                /*
                    Attach JWT Token to every outgoing request
                */
                config.headers = config.headers || {};
                if (Session.token) {
                    config.headers.Authorization = 'Bearer ' + Session.token;
                }
                return config;
            },
            'responseError': function (rejection) {
                /* 
                    The user is accessing restricted API or his API has expired 
                */
                if (rejection.status === 401 || rejection.status === 403) {
                    if( User.hasLoggedIn() ){
                        Session.destroy();
                        $location.path('/signin');
                    }
                    else {
                        $location.path('/');
                    }
                        
                }
                return $q.reject(rejection);
            }
        };
    }]);
    $locationProvider.html5Mode(true);
}])


.run(function($rootScope, $location, $timeout, Request, Session, User) {

/*
*
*  Upgrade MDL Object within ng-view partial
*
*/ 
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeDom();
        },100);
    });

/*
*
*  Load the facebook SDK asynchronously
*
*/ 
    (function(){
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {return;}

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script'); 
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());
/*
*
*  Loads user data by utilizing the web token stored in cookies
*  If the web token has not expired, it will load the profile successfully
*  
*/ 
    
})
        
.controller( "mainController", [ '$scope', 'UserProfile', function( $scope,  UserProfile, UserIdentity ){

    var navbarLayout = {};

    navbarLayout[UserIdentity.unauthenticatedUser] = [
        { 
            title: '登入',
            url: 'login'
        }
    ];
    navbarLayout[UserIdentity.authenticatedUser] = [
        { 
            title: '個人資料',
            url: 'profile'
        },
        { 
            title: '登出',
            url: 'logout'
        }
    ];

    $scope.navBar = navbarLayout;

    $scope.currentUser = {
        // User.getIdentity(UserProfile) 
        identity:  UserIdentity.unauthenticatedUser
    };

    $scope.enquiryHistory = [];

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

}]);


