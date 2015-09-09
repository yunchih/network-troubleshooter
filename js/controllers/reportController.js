
angular
.module( "networkTroubleshooter" )
.controller( "reportController", function( $scope ){

    // Export the enquiry
    
    var enquiry;
    var length = $scope.enquiryHistory.length;
    enquiryExport = [];
    for (var i = 0; i < length ; i++) {
         enquiry = enquiryHistory[i];
         enquiryExport.push( {
            question: enquiry.title,
            answer: enquiry.situation[ enquiry.selected.index ].answer
        });
    };

    $scope.enquiryExportResult = enquiryExport;

});
