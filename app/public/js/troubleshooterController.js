'use strict';


var troubleshooter = {

    done: function () {
        console.log("TroubleShooter--Done");
    },

    contact: function () {
        showOverlay('termOfService');
        console.log("TroubleShooter--Contact");
    },
    login: function () {
        showOverlay('login');
        console.log("TroubleShooter--Login");
    },
    logout: function () {
        showOverlay('termOfService');
        console.log("TroubleShooter--Logout");
    },
    profile: function () {
        showOverlay('profile');
        console.log("TroubleShooter--profile");
    }
};

var user = {
    unauthenticated_user: {
        navbarEntries: [
            { 
                title: '登入',
                url: 'login'
            }
        ]
    },
    authenticated_user: {
        navbarEntries: [
            { 
                title: '個人資料',
                url: 'profile'
            },
            { 
                title: '登出',
                url: 'logout'
            }
        ]
    }
};

var troubleshooterApp = 
angular

.module( "networkTroubleshooter", ["ngSanitize", "ngAnimate", "ngRoute"] )
.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/welcome.html'
        })
        .when('/troubleshooter', {
            templateUrl: 'partials/troubleshooter.html',
            controller: 'troubleshooterController'
        })
        .when('/:page', {
            templateUrl: function (param) {
                return 'partials/' + param.page + '.html';
            }
        });
    $locationProvider.html5Mode(true);
}])
.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeDom();
        },100);
    });
})

.controller( "mainController", [ '$scope', '$http', '$location', function( $scope , $http , $location ){
    $scope.user = user;
    $scope.troubleshooter = troubleshooter;
    $scope.userIdentity = 'authenticated_user';
    
}])

.controller( "troubleshooterController", [ '$scope', '$http', '$location', function( $scope , $http , $location ){

    $scope.enquiryHistory = [];
    $scope.currentEnquiry = model.issueList.issue;
    $scope.currentEnquiryID = 'issue';

    $scope.nextAction = function (action) {
        // Do the specified action
        troubleshooter[action]();
    };

    $scope.nextEnquiry = function ( next, action ){	
        if( next ){
            $scope.enquiryHistory.push( $scope.currentEnquiry );
            $scope.currentEnquiryID = next;
            $scope.currentEnquiry = model.issueList[ next ];
            setTimeout( function () {
               window.componentHandler.upgradeDom();
            } , 100 );
        }
    };

    $scope.historyBacktrack = function ( index ){
        $scope.currentEnquiry = $scope.enquiryHistory[index];
        $scope.enquiryHistory = $scope.enquiryHistory.slice( 0, index );
        window.setTimeout(  window.componentHandler.upgradeDom, 100 );
    };

    $scope.exportEnquiries = function () {
        var enquiry, exportJSON = [];
        for (var i =  $scope.enquiryHistory.length - 1; i >= 0; i--) {
             enquiry = $scope.enquiryHistory[i];
             exportJSON.push( {
                question: enquiry.title,
                answer: enquiry.situation[ enquiry.selected.index ].answer
            });

        };
    };
    $scope.showGuide = function (guide) {
        $scope.guide_url = 'partials/' +  guide.url ;
        $scope.guide_name = guide.name;
    };

}]);

