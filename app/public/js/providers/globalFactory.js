angular
.module( "networkTroubleshooter")
.factory('$global', function(){
    
    var userIdentity = 'unauthenticated_user';
    var user = {
        unauthenticated_user: {
            navbarLayout: [
                { 
                    title: '登入',
                    url: 'login'
                }
            ]
        },
        authenticated_user: {
            navbarLayout: [
                { 
                    title: '個人資料',
                    url: 'profile'
                },
                { 
                    title: '登出',
                    url: 'logout'
                }
            ]
        }
    };

    var schedule = {
        startTime: 9.5,  /* Starts at 9 am */
        endTime: 23.5,  /* Ends at 11 pm */

        numOfDateToChooseFrom: 5,
        numOfSchedule: 3
    };

    /* A list of necessary result entry used in contact page */
    /* The name of entry must correspond to id of its ng-template */
    var resultEntries = [
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

    return {

        getNavbar: function () {
            return user[ userIdentity ].navbarLayout;
        },  
        getResultEntries: function () {
            return resultEntries;
        },
        getSchedule: function () {
            return schedule;
        },
        updateUserIdentity: function (identity) {
            user.identity = identity;
        }
    };

});
