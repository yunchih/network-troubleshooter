angular
.module( "networkTroubleshooter")
.controller( "contactController", function( $scope ){
    /* A list of necessary result entry used in contact page */
    /* The name of entry must correspond to id of its ng-template */
    $scope.resultEntries = [
        { 
            id: 'redo',
            title: '重新進行疑難排解',
            action: 'troubleshoot'
        },
        { 
            id: 'report',
            title: '疑難排解報告'
        },
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
            title: '完成',
            action: 'send'
        }
    ];

    $scope.resultIndex = 0;

    var resultNumber = $scope.resultEntries.length;
    
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