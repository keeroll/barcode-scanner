import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// declare var captuvo: any;

platformBrowserDynamic().bootstrapModule(AppModule);

// document.addEventListener("deviceready", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[MainTS] Device is ready");
//     element.appendChild(text);

//     captuvo.registerScannerCallback(function (barcode) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[MainTS] Barcode scanned: ${ barcode }`);
//         element.appendChild(text);
//     });

//     captuvo.registerMagstripeCallback(function (track) {
//         //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
//         if (track.indexOf("%B") == 0) {
//             track = track.split('^');

//             let result = {
//                 number: track[0].substr(2), //strip leading %B
//                 name: track[1].trim(),
//                 expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
//             };

//             let element = document.getElementById("log-text");
//             let text = document.createTextNode(`\n[MainTS] Magstripe event. Result: ${ result }`);
//             element.appendChild(text);
//         }
//     });

//     captuvo.startScanning(function (data) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[MainTS] Start scanning: ${ data }`);
//         element.appendChild(text);
//     });
// });

// document.addEventListener("magstripeReady", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[MainTS] MSR (or device) is ready!");
//     element.appendChild(text);
// });

// document.addEventListener("scannerReady", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[MainTS] Barcode scanner is ready!");
//     element.appendChild(text);
// });

// document.addEventListener("captuvoConnected", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[MainTS] Captuvo sled is connected!");
//     element.appendChild(text);

//     captuvo.registerBatteryCallback(function (data) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[MainTS] Start scanning: ${ data }`);
//         element.appendChild(text);
//     });
// });

// document.addEventListener("captuvoDisconnected", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[MainTS] Captuvo sled has been disconnected!");
//     element.appendChild(text);
// });
