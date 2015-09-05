angular
.module( "networkTroubleshooter")
.controller( "contactController", function( $scope , $global ){
    $scope.resultEntries = $global.getResultEntries();
    $scope.resultIndex = 0;
    var resultNumber = $scope.resultEntries.length;
    
    var actions = {
        troubleshoot: function () {
            
        },
        send: function () {
            
        }
    };
    var doAction = function () {
        // Check if there's any action to be done
        // when we enter a new page.
        if( $scope.resultEntries[$scope.resultIndex].action ){
            actions[ $scope.resultEntries[$scope.resultIndex].action ]();
        }
    }
    $scope.gotoNextResult = function () {
        doAction();  
        $scope.resultIndex = $scope.resultIndex + 1;
    };
    $scope.gotoPreviousResult = function () {
        doAction();        
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
});