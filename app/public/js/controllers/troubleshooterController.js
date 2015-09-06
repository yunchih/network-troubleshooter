angular
.module( "networkTroubleshooter")
.controller( "troubleshooterController", function( $scope, $location ){

    $scope.currentEnquiry = model.issueList.issue;
    $scope.currentEnquiryID = 'issue';

    $scope.gotoNextPage = function (url) {
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

