'use strict';


var troubleshooterApp = 
angular
.module( "networkTroubleshooter", ["ngSanitize", "ngAnimate", "ngRoute","ngFacebook", "angularAwesomeSlider"] )
.config(['$routeProvider','$locationProvider','$facebookProvider', function ($routeProvider, $locationProvider, $facebookProvider) {

    $facebookProvider.setAppId(475318909316785);

    $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html'
        })
        .when('/troubleshooter', {
            templateUrl: 'partials/troubleshooter.html',
            controller: 'troubleshooterController'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'contactController'
        })
        .when('/login', {
            templateUrl : 'partials/login.html',
            controller: 'loginController',
        })
        .when('/:page', {
            templateUrl: function (param) {
                return 'partials/' + param.page + '.html';
            }
        });
    $locationProvider.html5Mode(true);
}])


.run(function($rootScope, $location, $timeout) {

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

})

.controller( "mainController", [ '$scope', 'UserIdentity', function( $scope,  UserIdentity ){

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
        identity: UserIdentity.unauthenticatedUser
    };

    $scope.enquiryHistory = [];

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

}]);


