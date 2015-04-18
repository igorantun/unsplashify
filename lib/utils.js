// Requires
var request = require('request');


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
                $('#cards').append('<div class="card col s3"><div class="card-image"><img class="lazy" data-original="http://unsplash.it/480/270?image=' + body[i - 1].id + '" width="480px" height="270px"></div><div class="card-action" data-id="' + body[i - 1].id + '"><a href="#!"><i data-action="set" class="action mdi-action-aspect-ratio"></i></a><a href="#!"><i data-action="add" class="action mdi-content-add-circle-outline"></i></a><a href="#!"><i data-action="fav" class="action mdi-action-favorite-outline"></i></a></div></div>');
            }
        }
    });
}

function checkConnection() {
    config.online = navigator.onLine;
    return navigator.onLine;
};


// Exports
module.exports = {
    getList: function() {
        return getList();
    },

    shuffleArray: function(array) {
        return shuffleArray(array);
    },

    checkConnection: function() {
        return checkConnection();
    }
};