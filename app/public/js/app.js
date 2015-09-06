'use strict';


var troubleshooterApp = 
angular
.module( "networkTroubleshooter", ["ngSanitize", "ngAnimate", "ngRoute", "angularAwesomeSlider"] )
.constant("API", {
    url: "dntrs-tinray.rhcloud.com/api/",
    version: "1.0"
})
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
        .when('/login', {
            templateUrl: 'partials/welcome.html',
            controller: 'loginController'
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



.controller( "mainController", [ '$scope', '$global', function( $scope, $global ){
    $scope.navBarLayout = $global.getNavbar();
}])

.controller( "reportController", function( $scope , $enquiryHistory ){
    $enquiryHistory.export();
    $scope.enquiryExportResult = $enquiryHistory.getExportedEnquiryHistory();
})

