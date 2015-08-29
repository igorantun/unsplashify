/* Requires */
var display = require('screen').getPrimaryDisplay();
var superb = require('superb');

var package = require('./package.json');
var wallpaper = require('./lib/wallpaper.js');
var schedule = require('./lib/schedule.js');
var utils = require('./lib/utils.js');


/* Variables */
var config = {
    version: package.version,
    width: display.size.width,
    height: display.size.height,
    online: null
};

var user = {
    name: null,
    timer: null,
    favorites: [],
    scheduled: [],
    added: []
};


/* Functions */
function checkAdd(object, id) {
    var index = user[object].indexOf(id);

    if(index === -1) {
        user[object].push(id);

        if(wallpaper.checkWallpaper(id) === false) {
            wallpaper.downloadWallpaper({
                method: 'specific',
                id: id
            });
        }

        return true;
    }

    user[object].splice(index, 1);
    return false;
}


/* Binds */
$('#menu-schedule').on('click', function() {
    schedule.startSchedule(2, 's');
    console.log('Scheduled: ' + user.scheduled);
});

$('#menu-favorites').on('click', function() {
    console.log('Favorites: ' + user.favorites);
});

$('#menu-settings').on('click', function() {
    console.log('Settings');
});

function bindClicks() {
    $('.action').on('click', function() {
        var id = $(this).parent().parent().attr('data-id');
        switch($(this).data('action')) {
            case 'set':
                if(wallpaper.checkWallpaper(id) === true) {
                    wallpaper.setWallpaper(id);
                } else {
                    wallpaper.downloadWallpaper({
                        method: 'specific',
                        id: id,
                        set: true
                    });
                }
            break;

            case 'add':
                if(checkAdd('scheduled', id)) {
                    $(this).addClass('teal-text');
                } else {
                    $(this).removeClass('teal-text');
                }
            break;

            case 'fav':
                if(checkAdd('favorites', id)) {
                    $(this).addClass('red-text');
                } else {
                    $(this).removeClass('red-text');
                }
            break;
        }
    })
}


/* Internal */
Notification.requestPermission();

(function startApp() {
    document.getElementById('subtitle').innerHTML = ' | ' + superb() + ' wallpapers';
    window.addEventListener('offline',  utils.checkConnection);
    window.addEventListener('online',  utils.checkConnection);
    utils.checkConnection();
    utils.getList();

    $('#schedule').hide();
    $('#settings').hide();
})();