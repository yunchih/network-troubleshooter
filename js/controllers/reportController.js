
angular
.module( "networkTroubleshooter" )
.controller( "reportController", function( $scope ){

    // Export the enquiry
    
    var enquiry;
    var length = $scope.enquiry.historyList.length;
    var enquiryExport = [];
    for (var i = 0; i < length ; i++) {
         enquiry = $scope.enquiry.historyList[i];
         enquiryExport.push( {
            question: enquiry.title,
            answer: enquiry.situation[ enquiry.selected.index ].answer
        });
    };

    $scope.enquiryExportResult = enquiryExport;

});
