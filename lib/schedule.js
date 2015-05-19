// Requires
var later = require('later');


// Variables
var timer = null;
var last;


// Functions
function startSchedule(number, unit) {
    if(!timer) {
        var interval = later.parse.text('every ' + number + ' ' + unit);
        timer = later.setInterval(updateWallpaper, interval);
    }
}

function pauseSchedule() {
    timer.clear();
}

function updateWallpaper() {
    var id = last;
    var random;

    if(user.scheduled.length === 0) {
        return;
    }

    while(id === last && user.scheduled.length > 1) {
        random = Math.floor(Math.random() * user.scheduled.length);
        id = user.scheduled[random];
    }

    last = id;
    return wallpaper.setWallpaper(id);
}


// Exports
module.exports = {
    startSchedule: function(number, unit) {
        return startSchedule(number, unit);
    },

    pauseSchedule: function() {
        return pauseSchedule();
    }
};