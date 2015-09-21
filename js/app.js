'use strict';


var troubleshooterApp =
angular
.module( "networkTroubleshooter", [
    "ngSanitize",
    "ngAnimate",
    "ngRoute",
    "ngFacebook",
    "ngCookies",
    "vcRecaptcha",
    /*"ngMockE2E", *//* Development Usage */
    "angularAwesomeSlider"] )
.config(['$routeProvider','$locationProvider','$httpProvider', '$facebookProvider', function ($routeProvider, $locationProvider, $httpProvider, $facebookProvider) {

    $facebookProvider
        .setAppId(475318909316785);

    $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html',
        })
        .when('/:page', {
            templateUrl: function (param) {
                return 'partials/' + param.page + '.html';
            }
        });

    $httpProvider.interceptors.push(['$q', '$location', 'Session', function ($q, $location, Session) {
        return {
            request: function (config) {
                console.log("Sending request to " + config.url);
                return config;
            },
            'responseError': function (rejection) {
                console.log("API CALL ERROR CATCHED: ",rejection);
                /* 
                    The user is accessing restricted API or his API has expired 
                */
                if (rejection.status === 401 || rejection.status === 403) {
                    Session.destroy();
                    // $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    }]);
    // $locationProvider.html5Mode(true);
}])


.run(function($rootScope, $location, $timeout, RestrictedRoute, Request, Session, User) {

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
*  Restrict routing access to certain pages.
*
*/ 

    var getLastUrlSegment = function (fullURL) {
        return fullURL.split('#')[1];
    };

    $rootScope.$on('$locationChangeStart', function (event, nextURL, previousURL) {
        if( User.canAccessRestrictedRoute() ){
            
            if( RestrictedRoute.indexOf(getLastUrlSegment(nextURL)) != -1 ){

                console.log("You're accessing a restricted page: " + nextURL );
                /* Save user's location to take him back to the same page after he has logged in */
                $rootScope.savedLocation = getLastUrlSegment(previousURL);

                $location.path('/login');

            }
        }
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
        
.controller( "mainController", [ '$scope', '$facebook', 'User', 'Session', function( $scope, $facebook, User, Session ){

    $scope.resetTroubleshooter = function () {
        $scope.enquiry = {
            historyList: [],
            currentID: 'issue',
            current: model.issueList[ 'issue' ]
        };
    };

    $scope.resetTroubleshooter();

    User.login($scope).then(function () {
        console.log("Current User: ", $scope.currentUser);
    });

}]);


