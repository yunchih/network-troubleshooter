'use strict';


var troubleshooterApp = 
angular
.module( "networkTroubleshooter", ["ngSanitize", "ngAnimate", "ngRoute", "angularAwesomeSlider"] )
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


.factory('$enquiryHistory', function(){ 

    var enquiryHistory = [], enquiryExport;
    return {

        update: function(history) {
            enquiryHistory = history;
        },
        export: function ( hasBeenExported ) {
            if( !hasBeenExported ){
                var enquiry;
                var length = enquiryHistory.length;
                enquiryExport = [];
                for (var i = 0; i < length ; i++) {
                     enquiry = enquiryHistory[i];
                     enquiryExport.push( {
                        question: enquiry.title,
                        answer: enquiry.situation[ enquiry.selected.index ].answer
                    });
                };
            }
            return enquiryExport;
        }
    };
})

.controller( "mainController", [ '$scope', '$global', function( $scope, $global ){
    $scope.navBarLayout = $global.getNavbar();
}])

.controller( "reportController", function( $scope , $enquiryHistory ){
    $scope.enquiryExportResult = 
    $enquiryHistory.export(
        false 
        /* We notify the factory that this is the first time enquiryHistory is exported.*/
        /* Previous enquiryHistory will be replaced by the new one. */
    );
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

