import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

declare var captuvo: any;

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

document.addEventListener("deviceready", function () {
    let element = document.getElementById("log-text");
    let text = document.createTextNode("\n[AppComponent] Device is ready");
    element.appendChild(text);

    captuvo.registerScannerCallback(function (barcode) {
        let element = document.getElementById("log-text");
        let text = document.createTextNode(`\n[AppComponent] Barcode scanned: ${ barcode }`);
        element.appendChild(text);
    });

    captuvo.registerMagstripeCallback(function (track) {
        //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
        if (track.indexOf("%B") == 0) {
            track = track.split('^');

            let result = {
                number: track[0].substr(2), //strip leading %B
                name: track[1].trim(),
                expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
            };

            let element = document.getElementById("log-text");
            let text = document.createTextNode(`\n[AppComponent] Magstripe event. Result: ${ result }`);
            element.appendChild(text);
        }
    });

    captuvo.startScanning(function (data) {
        let element = document.getElementById("log-text");
        let text = document.createTextNode(`\n[AppComponent] Start scanning: ${ data }`);
        element.appendChild(text);
    });
});

document.addEventListener("magstripeReady", function () {
    let element = document.getElementById("log-text");
    let text = document.createTextNode("\n[AppComponent] MSR (or device) is ready!");
    element.appendChild(text);
});

document.addEventListener("scannerReady", function () {
    let element = document.getElementById("log-text");
    let text = document.createTextNode("\n[AppComponent] Barcode scanner is ready!");
    element.appendChild(text);
});

document.addEventListener("captuvoConnected", function () {
    let element = document.getElementById("log-text");
    let text = document.createTextNode("\n[AppComponent] Captuvo sled is connected!");
    element.appendChild(text);

    captuvo.registerBatteryCallback(function (data) {
        let element = document.getElementById("log-text");
        let text = document.createTextNode(`\n[AppComponent] Start scanning: ${ data }`);
        element.appendChild(text);
    });
});

document.addEventListener("captuvoDisconnected", function () {
    let element = document.getElementById("log-text");
    let text = document.createTextNode("\n[AppComponent] Captuvo sled has been disconnected!");
    element.appendChild(text);
});