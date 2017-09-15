/*
	El-Project 
	November 2017 
    Author IcolSky
    Created by Hunter on 9/15/17.
*/
(function () {
    'use strict';
    const path = require('path');
    const { app, shell, BrowserWindow } = require('electron');

    const Common = require('../../common');

    class SystemWindow {
        constructor() {
            //
            this.loginState = { NULL: 'undefined', YES: true, NO: false };
            this.loginEdState = this.loginState.NO;
            this.inervals = {};
            //
            this.createWindow();
        }
        // resize Window
        resizeWindow(isLogged, splashWindow) {
            const size = isLogged ? Common.WINDOW_SIZE : Common.WINDOW_SIZE_LOGIN;

            this.systemWindow.setResizable(isLogged);
            this.systemWindow.setSize(size.width, size.height);

            if (!isLogged && !this.loginEdState) {
                splashWindow.hide();
                this.systemWindow.show();
                this.systemWindow.center();
            } else {
                this.systemWindow.maximize();
            }
        }
        //create system Window
        createWindow() {
            this.systemWindow = new BrowserWindow({
                title: Common.ELECTRONIC_SYNSYSTEM,
                resizable: true,
                center: true,
                show: false,
                frame: false,
                transparent: true,
                autoHideMenuBar: true,
                icon: path.join(__dirname, '../../../assets/icon.png'),
                titleBarStyle: 'hidden-inset',
                webPreferences: {
                    javascript: true,
                    allowRunningInsecureContent: true,
                    plugins: true,
                    nodeIntegration: false,
                    webSecurity: false,
                    preload: path.join(__dirname, '../../inject/preload.js'),
                },
            });
            //set WebContents Request Headers [User-Agent]
            this.systemWindow.webContents.setUserAgent(Common.USER_AGENT);
            //Debut mode   Config to constant file Commom.js
            if (Common.DEBUG_MODE) {
                this.systemWindow.webContents.openDevTools();
            }
            //execute Connect
            this.connect();

            //The event is sent when the user or page wants to start navigating
            /*
                Emitted when a user or the page wants to start navigation.It can happen when the window.location object is changed or a user clicks a link in the page.
                This event will not emit when the navigation is started programmatically with APIs like webContents.loadURL and webContents.back.
                It is also not emitted for in-page navigations, such as clicking anchor links or updating the window.location.hash.Use did- navigate -in-page event for this purpose.
                Calling event.preventDefault() will prevent the navigation.
            */
            this.systemWindow.webContents.on('will-navigate', (ev, url) => {
                /app|index/.test(url) ? this.loginEdState = this.loginState.YES : this.loginEdState = this.loginState.NO;
            });
            //It fires when the window closes. It fires before the beforeunload and unload event in DOM. Using event.preventDefault () can cancel this operation
            /*
                Emitted when the window is going to be closed. It¡¯s emitted before the beforeunload and unload event of the DOM. Calling event.preventDefault() will cancel the close.
            */
            this.systemWindow.on('close', (e) => {
                if (this.systemWindow.isVisible()) {
                    e.preventDefault();
                    this.systemWindow.hide();
                }
            });
        }
        //set SystemWindow LoadUrl to parameter uri
        loadURL(uri) {
            this.systemWindow.loadURL(uri);
        }
        //show SystemWindow
        show() {
            this.systemWindow.show();
        }
        // Connect 
        connect() {
            Object.keys(this.inervals).forEach((key, index) => {
                clearInterval(key);
                delete this.inervals[key];
            });
            this.loadURL('file://' + path.join(__dirname, '/../views/appLogin.html'));
            //this.loadURL(Common.WEB_SYTEM_URL);
            //Reconnect  5 sec 
            const int = setInterval(() => {
                if (this.loginEdState === this.loginState.NULL) {
                    this.loadURL('file://' + path.join(__dirname, '/../views/appLogin.html'));
                    //this.loadURL(Common.WEB_SYTEM_URL);
                }
            }, 5000);
            this.inervals[int] = true;
        }
    }

    module.exports = SystemWindow;
}).call(this);