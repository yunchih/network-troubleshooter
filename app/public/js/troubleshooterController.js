'use strict';


var troubleshooterApp = 
angular
.module( "networkTroubleshooter", ["ngSanitize", "ngAnimate", "ngRoute", "vr.directives.slider"] )
.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
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
        .when('/:page', {
            templateUrl: function (param) {
                return 'partials/' + param.page + '.html';
            }
        });
    $locationProvider.html5Mode(true);
}])

/*
*
*  Upgrade MDL Object within ng-view partial
*
*/
.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeDom();
        },100);
    });
})

.factory('$global', function(){

    var userIdentity = 'authenticated_user';
    var user = {
        unauthenticated_user: {
            navbarLayout: [
                { 
                    title: '登入',
                    url: 'login'
                }
            ]
        },
        authenticated_user: {
            navbarLayout: [
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

    var schedule = {
        startTime: 9.5,  /* Starts at 9 am */
        endTime: 23.5,  /* Ends at 11 pm */

        numOfDateToChooseFrom: 5,
        numOfSchedule: 3
    };

    /* A list of necessary result entry used in contact page */
    /* The name of entry must correspond to id of its ng-template */
    var resultEntries = [
        // { 
        //     id: 'report',
        //     title: '疑難排解報告'
        // },
        {
            id: 'pickTime',
            title: '有空時間'
        },
        {
            id: 'confirmProfile',
            title: '聯絡方式'
        },
        {
            id: 'done',
            title: '完成'
        }
    ];

    return {

        getNavbar: function () {
            return user[ userIdentity ].navbarLayout;
        },  
        getResultEntries: function () {
            return resultEntries;
        },
        getSchedule: function () {
            return schedule;
        },
        updateUserIdentity: function (identity) {
            user.identity = identity;
        }
    };

})

.factory('$enquiryHistory', function(){ 

    var enquiryHistory = [];

    return {

        update: function(history) {
            enquiryHistory = history;
        },
        export: function () {
            var enquiry, enquiryExport = [];
            var length = enquiryHistory.length;
            for (var i = 0; i < length ; i++) {
                 enquiry = enquiryHistory[i];
                 enquiryExport.push( {
                    question: enquiry.title,
                    answer: enquiry.situation[ enquiry.selected.index ].answer
                });
            };

            return enquiryExport;
        }
    };
})

.controller( "mainController", [ '$scope', '$global', function( $scope, $global ){
    $scope.navBarLayout = $global.getNavbar();
}])

.controller( "contactController", function( $scope , $global ){
    $scope.resultEntries = $global.getResultEntries();
    $scope.resultIndex = 0;
    var resultNumber = $scope.resultEntries.length;

    $scope.gotoNextResult = function () {
        $scope.resultIndex = $scope.resultIndex + 1;
    };
    $scope.gotoPreviousResult = function () {
        $scope.resultIndex = $scope.resultIndex - 1;
    };
    $scope.getPrevious = function () {
        if( $scope.resultIndex != 0 )
            return $scope.resultEntries[$scope.resultIndex - 1].title;
        else
            return null;
    };
    $scope.getNext = function () {
        if( $scope.resultIndex != resultNumber - 1 )
            return $scope.resultEntries[$scope.resultIndex + 1].title;
        else
            return null;
        
    };
})


.controller( "reportController", function( $scope , $enquiryHistory ){
    $scope.enquiryExportResult = $enquiryHistory.export();
})

.controller( "troubleshooterController", function( $scope, $rootScope, $location, $enquiryHistory ){

    $scope.enquiryHistory = [];
    $scope.currentEnquiry = model.issueList.issue;
    $scope.currentEnquiryID = 'issue';
    $rootScope.exportEnquiries = {};

    $scope.gotoNextPage = function (url) {

        // Troubleshooter is done
        // Prepare for export
        $enquiryHistory.update( $scope.enquiryHistory );
        
        $location.path(url);
    };

    $scope.gotoNextEnquiry = function ( next ){	
        if( next ){
            $scope.enquiryHistory.push($scope.currentEnquiry);
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

    $scope.showGuide = function (guide) {
        $scope.guide_url = 'partials/' +  guide.url ;
        $scope.guide_name = guide.name;
    };

});

