angular
.module( "networkTroubleshooter")
.controller( "contactController", function( $scope, $location ){

    var first = { 
        title: '重新進行疑難排解',
        action: function () {
            
            $scope.resetTroubleshooter();

            $location.path('troubleshooter');
        }
    };

    var last = {
        title: '完成',
        action: function () {
            $location.path('/');
        }
    };

    /* A list of necessary result entry used in contact page */
    /* The name of entry must correspond to id of its ng-template */

    $scope.resultEntries = [
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
            id: 'moreWords',
            title: '想跟我們說的話'
        }
    ];

    $scope.resultIndex = 0;

    var resultNumber = $scope.resultEntries.length;
    
    $scope.gotoNextResult = function () {
        if( $scope.resultIndex != resultNumber - 1 )
            $scope.resultIndex = $scope.resultIndex + 1;
        else
            last.action();

        setTimeout( function () {
               window.componentHandler.upgradeDom();
            } , 100 );

    };
    $scope.gotoPreviousResult = function () {
        if( $scope.resultIndex != 0 )
            $scope.resultIndex = $scope.resultIndex - 1;
        else
            first.action();

        setTimeout( function () {
               window.componentHandler.upgradeDom();
            } , 100 );
        
    };
    $scope.getPrevious = function () {
        if( $scope.resultIndex != 0 )
            return $scope.resultEntries[$scope.resultIndex - 1].title;
        else
            return first.title;
    };
    $scope.getNext = function () {
        if( $scope.resultIndex != resultNumber - 1 )
            return $scope.resultEntries[$scope.resultIndex + 1].title;
        else
            return last.title;
    };

    $scope.setCAPTCHA = function (res) {
        $scope.profile.recaptcha = res;
        $scope.warnCAPTCHA = false;
    };
    $scope.CAPTCHAexpired = function() {
        $scope.profile.recaptcha = '';
        $scope.warnCAPTCHA = true;
    };


});