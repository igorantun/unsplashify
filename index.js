// Requires
var display = require('screen').getPrimaryDisplay();
var wallpaper = require('wallpaper');
var request = require('request');
var superb = require('superb');
var fs = require('fs-extra');


// Variables
var config = {
    online: null,
    blur: false,
    width: display.size.width,
    height: display.size.height
};


// Functions
function getList() {
    $('#loading').show();
    request('https://unsplash.it/list', function(err, req, body) {
        $('#loading').hide();
        body = JSON.parse(body);
        for(var i = body.length; i >= 0; i--) {
            if(i === 0) {
                $(function() {
                    $('img.lazy').lazyload();
                });

                $('img.lazy').lazyload({
                    threshold: 12,
                    effect: "fadeIn"
                });

                bindClicks();
            } else {
                $('#cards').append('<div class="card col s3"><div class="card-image"><img class="lazy" data-original="http://unsplash.it/480/270?image=' + body[i - 1].id + '" width="480px" height="270px"></div><div class="card-action"><a href="#!"><i data-action="set" data-id="' + body[i - 1].id + '" class="action mdi-action-aspect-ratio"></i></a><a href="#!"><i data-action="add" class="action mdi-content-add-circle-outline"></i></a><a href="#!"><i data-action="fav" class="action mdi-action-favorite-outline"></i></a></div></div>');
            }
        }
    });
}

function downloadWallpaper(method, options) {
    var id = options.id || (Math.random() + 1).toString(36).substr(2, 10);
    var size = config.width + '/' + config.height;
    var path = __dirname + '/dl/' + id;
    var base = 'https://unsplash.it/';

    if(options && options.grayscale === true) {
        base += 'g/';
        path += '-grey';
    }

    if(method === 'random') {
        var link = base + size + '/?random';
    } else if(method === 'specific') {
        var link = base + size + '?image=' + options.id;
    } else {
        return console.error('Invalid method');
    }

    if(options && options.blur === true) {
        link += '&blur';
        path += '-blur';
    }

    fs.exists(path, function(exists) {
        if(exists === true) {
            setWallpaper(path);
        } else {
            request(link)
            .pipe(fs.createOutputStream(path)
                .on('finish', function() {
                    setWallpaper(path);
                }))
            .on('error', function(err) {
                console.error(err);
            });
        }
    });
}

function setWallpaper(path) {
    wallpaper.set(path, function(err) {
        if(!err) {
            return console.log('Success');
        } else {
            return console.error(err);
        }
    })
}

function getWallpaper() {
    wallpaper.get(function(err, path) {
        if(!err) {
            console.log(path);
            return path
        } else {
            console.error(err);
            return false;
        }
    });
}

function checkConnection() {
    config.online = navigator.onLine;
    return navigator.onLine;
};


// Binds
function bindClicks() {
    $('.action').on('click', function() {
        switch($(this).data('action')) {
            case 'set':
                downloadWallpaper('specific', {id:$(this).data('id')});
                break;
            case 'add':
                console.log('add');
                break;
            case 'fav':
                console.log('fav');
                break;
        }
    })
}


// Intern
document.getElementById('subtitle').innerHTML = ' | ' + superb() + ' wallpapers';
window.addEventListener('offline',  checkConnection);
window.addEventListener('online',  checkConnection);
checkConnection();
getList();