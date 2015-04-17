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

    while(id === last) {
        random = Math.floor(Math.random() * user.favorites.length);
        id = user.favorites[random];
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
}