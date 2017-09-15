/*
	El-Project 
	November 2017 
    Author IcolSky
    Created by Hunter on 9/15/17.
*/
(function () {
    'use strict'; 
    const path = require('path');
    const { app, Menu, nativeImage, Tray } = require('electron');

    const Common = require('../../common');

    class AppTray {
         //Constructor ,Notification Bar Menu init
        constructor(splashWindow, systemWindow) {
            this.splashWindow = splashWindow;
            this.systemWindow = systemWindow;

            let image;
            if (process.platform === 'linux') {
                image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar_linux.png'));
            } else {
                image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar.png'));
            }
            image.setTemplateImage(true);

            this.tray = new Tray(image);
            this.tray.setToolTip(Common.ELECTRONIC_SYNSYSTEM);

            const contextMenu = Menu.buildFromTemplate([
                { label: 'Show', click: () => this.hideSplashAndShowSystem() },
                { label: 'Exit', click: () => app.exit(0) },
            ]);
            this.tray.setContextMenu(contextMenu);
            this.tray.on('click', () => this.hideSplashAndShowSystem());
        }
         
        //This Fn is Hide Splash And Show System Window
        hideSplashAndShowSystem() {
            if (this.splashWindow.isShown) return;
            this.systemWindow.show();
        }
    }

    module.exports = AppTray;
}).call(this);