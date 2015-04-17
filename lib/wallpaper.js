// Requires
var wallpaper = require('wallpaper');
var request = require('request');
var fs = require('fs-extra');
var path = require('path');


// Variables
var dir = path.join(__dirname, '../dl/');


// Functions
function downloadWallpaper(options) {
    var id = options.id || (Math.random() + 1).toString(36).substr(2, 10);
    var size = config.width + '/' + config.height;
    var base = 'https://unsplash.it/';
    var path = dir + id;

    if(options && options.grayscale === true) {
        base += 'g/';
        path += '-grey';
    }

    if(options.method === 'random') {
        var link = base + size + '/?random';
    } else if(options.method === 'specific') {
        var link = base + size + '?image=' + options.id;
    } else {
        return console.error('Invalid method');
    }

    if(options && options.blur === true) {
        link += '&blur';
        path += '-blur';
    }

    request(link)
    .pipe(fs.createOutputStream(path)
        .on('finish', function() {
            if(options.set === true) {
                setWallpaper(id);
            }
        }))
    .on('error', function(err) {
        return console.error(err);
    });
}

function setWallpaper(id) {
    var path = dir + id;
    wallpaper.set(path, function(err) {
        if(err) {
            return console.error(err);
        }
    })
}

function checkWallpaper(id) {
    var path = dir + id;
    var exists = null;

    try {
        fs.openSync(path, 'r', function(){});
        return true;
    } catch(err) {
        return false;
    }
}


// Exports
module.exports = {
    downloadWallpaper: function(options) {
        return downloadWallpaper(options);
    },

    setWallpaper: function(id) {
        return setWallpaper(id);
    },

    checkWallpaper: function(id) {
        return checkWallpaper(id);
    }
}