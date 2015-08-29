/* Requires */
var app = require('app');
var Menu = require('menu');
var Tray = require('tray');
var path = require('path');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();
require('electron-debug')();


/* Variables */
var appIcon = null;
var mainWindow = null;
var iconPath = path.join(__dirname, '/public/img/logo.png');


/* Internal */
app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1400,
        height: 658,
        center: true,
        title: 'Unsplashify',
        icon: __dirname + '/public/img/logo.png'
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.setMenu(null);

    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.setMinimumSize(800, 400);
        mainWindow.show();
        mainWindow.focus();

        appIcon = new Tray(iconPath);
        var contextMenu = Menu.buildFromTemplate([{
            label: 'Electron'
        }]);
        appIcon.setToolTip('This is my application.');
        appIcon.setContextMenu(contextMenu);
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});