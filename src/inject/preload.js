'use strict';
const { ipcRenderer, webFrame } = require('electron');
const Common = require('../common');

class Injector {
    //Init
    init() {
        if (Common.DEBUG_MODE) {
            Injector.lock(window, 'console', window.console);
        }

        this.initInjection();
        webFrame.setZoomLevelLimits(1, 1);
    }
    //  Init Injection
    initInjection() {
        ipcRenderer.send('syn-rendered', false);

    }

    // Lock Static Fn
    static lock(object, key, value) {
        return Object.defineProperty(object, key, {
            get: () => value,
            set: () => {
            },
        });
    }
}

new Injector().init();
