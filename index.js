// Requires
var wallpaper = require('wallpaper');
var fs = require('fs');
var request = require('request');

// Variables
var config = {
    online: null,
    highres: true
};

var i = 0;


// Functions
function downloadWallpaper(method, param) {
    if(method === 'random') {
        var link = 'http://www.splashbase.co/api/v1/images/random';
    } else if(method === 'latest') {
        var link = 'http://www.splashbase.co/api/v1/images/latest?images_only=true';
    } else if(method === 'search') {
        if(!param) {
            return console.error('Invalid Query');
        } else {
            var link = 'http://www.splashbase.co/api/v1/images/search?query=' + param;
        }
    } else {
        return console.error('Invalid Method');
    }

    var path = __dirname + '/dl/' + method + i;

    request(link, function(err, res, body) {
        if(method === 'latest' || method === 'search') {
            parsed = JSON.parse(body).images[0];
        } else {
            parsed = JSON.parse(body);
        }

        if(config.highres === true) {
            link = parsed.large_url || parsed.url;
        } else {
            link = parsed.url;
        }

        request(link)
            .pipe(fs.createWriteStream(path))
            .on('response', function(response) {
                console.log(response.statusCode)
                console.log(response.headers['content-type'])
            })
            .on('error', function(err) {
                console.error(err)
            })
            .on('close', function() {
                setWallpaper(path)
            });

        console.log('Downloading...');
        i++;
    });
}

function setWallpaper(path) {
    wallpaper.set(path, function(err) {
        if(!err) {
            console.log('Success');
        } else {
            console.error(err);
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


// Intern
window.addEventListener('online',  checkConnection);
window.addEventListener('offline',  checkConnection);
checkConnection();