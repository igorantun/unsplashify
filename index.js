// Requires
var display = require('screen').getPrimaryDisplay();
var superb = require('superb');

var package = require('./package.json');
var wallpaper = require('./lib/wallpaper.js');
var schedule = require('./lib/schedule.js');
var utils = require('./lib/utils.js');


// Variables
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
    added: []
}


// Binds
$('#menu-schedule').on('click', function() {
    console.log('Schedule');
    schedule.startSchedule(2, 's');
});

$('#menu-favorite').on('click', function() {
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
                if(wallpaper.checkWallpaper(id) === true) {
                    user.favorites.push(id);
                } else {
                    wallpaper.downloadWallpaper({
                        method: 'specific',
                        id: id
                    });
                }
                break;
            case 'fav':
                break;
        }
    })
}


// Intern
function startApp() {
    document.getElementById('subtitle').innerHTML = ' | ' + superb() + ' wallpapers';
    window.addEventListener('offline',  utils.checkConnection);
    window.addEventListener('online',  utils.checkConnection);
    utils.checkConnection();
    utils.getList();

    $('#schedule').hide();
    $('#settings').hide();
}

startApp();