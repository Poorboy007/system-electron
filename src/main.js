/*
	El-Project 
	November 2017 
    Author IcolSky
    Created by Hunter on 9/15/17.
*/
(function () {
    'use strict'; 
    const path = require('path');
    const {app, ipcMain} = require('electron'); 

    const Common = require('./common');

    const SplashWindow = require('./windows/controllers/splash');
    const SystemWindow = require('./windows/controllers/system');
    const AppTray = require('./windows/controllers/apptray');

    class ElectronicSynSystem {
        constructor() {
            this.synSystemWindow = null;
            this.splashWindow = null;
            this.tray = null;
        }
        // init Actions
        init() {
            this.initApp();
            this.initIPC();
        }
        // init App 
        initApp() {
            app.on('ready', () => {
                this.createSplashWindow();
                this.createSystemWindow();
                this.createTray();
            });

            app.on('activate', () => {
                if (this.synSystemWindow == null) {
                    this.createSystemWindow();
                } else {
                    this.synSystemWindow.show();
                }
            });
        };
        //init IPC  
        /**
         * The ipcMain module is an instance of the EventEmitter class that is used in the main process,
           It handles the synchronous and asynchronous messages that are sent in the rendering process.
         */
        initIPC() {
            
            ipcMain.on('syn-rendered', (event, isLogged) => {
                const _this = this;
                setTimeout(function () {
                    _this.synSystemWindow.resizeWindow(isLogged, _this.splashWindow);
                }, 2000);
            });
   
        };
        //  Create a Notification Bar Menu
        createTray() {
            this.tray = new AppTray(this.splashWindow, this.synSystemWindow);
        }
        //  Create a System Startup Load Page
        createSplashWindow() {
            this.splashWindow = new SplashWindow();
            this.splashWindow.show();
        }
        //  Create SystemWindow
        createSystemWindow() {
            this.synSystemWindow = new SystemWindow();
        }
    }

    new ElectronicSynSystem().init();
}).call(this);