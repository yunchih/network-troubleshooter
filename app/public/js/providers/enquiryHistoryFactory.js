angular
.module( "networkTroubleshooter")
.factory('$enquiryHistory', function(){ 

    var enquiryHistory = [], enquiryExport;
    return {

        update: function(history) {
            enquiryHistory = history;
        },
        export: function ( hasBeenExported ) {
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
        },
        getExportedEnquiryHistory: function () {
            return enquiryExport;
        }
    };
});
