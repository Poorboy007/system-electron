/*
	El-Project 
	November 2017 
    Author IcolSky
    Created by Hunter on 9/15/17.
*/
(function () {
    'use strict';
    const path = require('path');
    const { BrowserWindow } = require('electron');

    const Common = require('../../common');

    class SplashWindow {
        //Constructor ,execute BrowserWindow init
        constructor() {
            this.splashWindow = new BrowserWindow({
                width: Common.WINDOW_SIZE_LOADING.width,
                height: Common.WINDOW_SIZE_LOADING.height,
                title: Common.ELECTRONIC_SYNSYSTEM,
                resizable: false,
                center: true,
                show: true,
                frame: false,
                transparent: true,
                autoHideMenuBar: true,
                alwaysOnTop: true,
                icon: path.join(__dirname, '../../../assets/icon.png'),
                titleBarStyle: 'hidden',
            });
            //Load splash html local file 
            this.splashWindow.loadURL('file://' + path.join(__dirname, '/../views/splash.html'));
            this.isShown = false;
        }
        //Show Splash
        show() {
            this.splashWindow.show();
            this.isShown = true;
        }
        //hide Splash
        hide() {
            this.splashWindow.hide();
            this.isShown = false;
        }
    }

    module.exports = SplashWindow;
}).call(this);