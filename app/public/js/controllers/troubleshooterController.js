angular
.module( "networkTroubleshooter")
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

