/*
	El-Project 
	November 2017 
    Author IcolSky
    Created by Hunter on 9/15/17.
*/
(function () {
    'use strict';
    class Common {  }
    Common.ELECTRON = 'Electron';
    Common.ELECTRONIC_SYNSYSTEM = 'SynSystem-EL';
    Common.DEBUG_MODE = false;
    Common.WINDOW_SIZE = {
        width: 800,
        height: 600,
    };
    Common.WINDOW_SIZE_LOGIN = {
        width: 370,
        height: 450,
    };
    Common.WINDOW_SIZE_LOADING = {
        width: 345,
        height: 360,
    };
    Common.USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36'; 

    Common.WEB_SYTEM_URL = 'http://abc.com/page/login.html';

    module.exports = Common;
}).call(this);