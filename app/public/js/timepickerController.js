
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
            from: schedule.startTime,
            to: schedule.endTime
        });
    };
    console.log(schedule);
    console.log( (schedules[0].from).toString());

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
angular
.module( "networkTroubleshooter")
.controller( "timepickerController", [ '$scope', '$global', function( $scope, $global ){

    var schedule = $global.getSchedule();

    $scope.selectDate = function (_schedule, selectedDate) {
        _schedule.date = selectedDate;
    };
    $scope.transformTime = function (time) {
        var formattedTime = formatTime(time);
        return  formattedTime.hour + ':' + formattedTime.minute + ' ' + formattedTime.PMorAM
        if( time > 12 ) {
            time = time - 12;
            return ' PM' + time.toString();
        }
        return ' AM' + time.toString();
    };
    $scope.dates = populateNextFewDays(schedule.numOfDateToChooseFrom);
    $scope.availableSchedules = populateSchedule(schedule);
    $scope.timeSlider = {
        from: schedule.startTime,
        to: schedule.endTime
    }

}]);