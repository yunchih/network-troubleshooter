
function populateNextFewDays (numberOfDates) {
    var weekDayName = ['日','一','二','三','四','五','六'];

    var dates = ['今天','明天'], 
        date = new Date();

    var today = date.getDay(); // Get the today's weekday index

    date.setDate( date.getDate() + dates.length );

    for (var i = numberOfDates - dates.length ; i > 0; i--) {
        var day = date.getDay(); // Get the weekday ( 0 to 6 )
        if( day != 0 && day < today){
            dates.push('下週' + weekDayName[day]);
        }
        else{
            dates.push('本週' + weekDayName[day]);
        }
        date.setDate( date.getDate()+1 );
    };

    return dates;
}

function populateSchedule (schedule) {
    var schedules = [];
    for (var i = schedule.numOfSchedule - 1; i >= 0; i--) {
        schedules.push({
            date: '',
            scheduleSliderString: schedule.startTime.toString() + ';' + schedule.endTime.toString()
        });
    };

    return schedules;
}

function formatTime (time) {
    var hour = Math.floor(time);
    return {
        hour: hour > 12 ? hour-12 : hour,
        minute: Math.ceil(time) > hour ? '30' : '00',
        PMorAM: hour >= 12 ? 'PM' : 'AM'
    };
}

function transformTime(time) {
    var formattedTime = formatTime(time);
    return  formattedTime.hour + ':' + formattedTime.minute + ' ' + formattedTime.PMorAM
};

angular
.module( "networkTroubleshooter")
.controller( "timepickerController", [ '$scope', 'Schedule', function( $scope, Schedule ){

    $scope.selectDate = function (_schedule, selectedDate) {
        _schedule['date'] = selectedDate;
    };
    
    $scope.dates = populateNextFewDays(Schedule.numOfDateToChooseFrom);
    $scope.availableSchedules = populateSchedule(Schedule);
    $scope.scheduleSliderOptions = {
        from: 0,
        to: 24,
        step: 0.5,
        round: 1,
        skin: 'round' ,
        scale: [ {val: 6,label:'早上'}, {val: 12, label:'中午'}, {val: '18', label:'傍晚'}],
        modelLabels: transformTime
    }

}]);