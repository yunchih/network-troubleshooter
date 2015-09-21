angular
.module( "networkTroubleshooter")
.controller( "troubleshooterController", function( $scope, $location ){

    $scope.gotoNextPage = function (url) {
        $location.path(url);
    };

    $scope.gotoNextEnquiry = function ( next ){
        if( next ){
            $scope.enquiry.historyList.push( $scope.enquiry.current );
            $scope.enquiry.currentID = next;
            $scope.enquiry.current = model.issueList[ next ];
            setTimeout( function () {
               window.componentHandler.upgradeDom();
            } , 100 );

            console.log("Current Enquiry: " , $scope.enquiry.currentID);

        }
    };

    $scope.historyBacktrack = function ( index ){
        $scope.enquiry.current = $scope.enquiry.historyList[index];
        $scope.enquiry.historyList = $scope.enquiry.historyList.slice( 0, index );
        window.setTimeout(  window.componentHandler.upgradeDom, 100 );
    };

    $scope.showGuide = function (guide) {
        $scope.guide_url = 'partials/' +  guide.url ;
        $scope.guide_name = guide.name;
    };

});

