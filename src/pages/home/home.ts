import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@awesome-cordova-plugins/camera-preview/ngx';

declare var captuvo: any;
declare var window: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public logString: string = "No logs yet...";

    public cameraPreviewOptions: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'rear',
        tapPhoto: false,
        previewDrag: false,
        toBack: false,
        alpha: 1,
        tapFocus: false,
        disableExifHeaderStripping: false
    };

    constructor(public navCtrl: NavController,
        private cameraPreview: CameraPreview) { }

    public ngOnInit(): void {
        this.loadCameraPreview();

        // try to listen plugin events directly
        // this.useCaptuvoDefaultEvents();
        // this.useCaptuvoWindowPluginsEvents();
        // this.useCaptuvoWindowEvents();
        // this.useCaptuvoFullNameDefaultEvents();
        // this.useCaptuvoWindowFullNamePluginsEvents();
        // this.useCaptuvoFullNameWindowEvents();
        
        // listen document an window events
        this.listenDocumentEvents();
        this.listenWindowEvents(); 
    }

    public listenDocumentEvents(): void {
        const logPrefix: string = "[Document event]";

        document.addEventListener("deviceready", function () {
            this.logEvent("Device is ready", logPrefix);

            this.useCaptuvoDefaultEvents();
            this.useCaptuvoWindowPluginsEvents();
            this.useCaptuvoWindowEvents();
            this.useCaptuvoFullNameDefaultEvents();
            this.useCaptuvoWindowFullNamePluginsEvents();
            this.useCaptuvoFullNameWindowEvents();
        });

        document.addEventListener("magstripeReady", function () {
            this.logEvent("MSR (or device) is ready!", logPrefix);
        });

        document.addEventListener("scannerReady", function () {
            this.logEvent("Barcode scanner is ready!", logPrefix);
        });

        document.addEventListener("captuvoConnected", function () {
            this.logEvent("Captuvo sled is connected!", logPrefix);

            captuvo.registerBatteryCallback(function (data) {
                this.logEvent(`Start scanning: ${ data }`, logPrefix);
            });
        });

        document.addEventListener("captuvoDisconnected", function () {
            this.logEvent("Captuvo sled has been disconnected!", logPrefix);
        });
    }

    public listenWindowEvents(): void {
        const logPrefix: string = "[Window event]";

        window.addEventListener("deviceready", function () {
            this.logEvent("Device is ready", logPrefix);

            this.useCaptuvoDefaultEvents();
            this.useCaptuvoWindowPluginsEvents();
            this.useCaptuvoWindowEvents();
            this.useCaptuvoFullNameDefaultEvents();
            this.useCaptuvoWindowFullNamePluginsEvents();
            this.useCaptuvoFullNameWindowEvents();
        });

        window.addEventListener("magstripeReady", function () {
            this.logEvent("MSR (or device) is ready!", logPrefix);
        });

        window.addEventListener("scannerReady", function () {
            this.logEvent("Barcode scanner is ready!", logPrefix);
        });

        window.addEventListener("captuvoConnected", function () {
            this.logEvent("Captuvo sled is connected!", logPrefix);

            captuvo.registerBatteryCallback(function (data) {
                this.logEvent(`Start scanning: ${ data }`, logPrefix);
            });
        });

        window.addEventListener("captuvoDisconnected", function () {
            this.logEvent("Captuvo sled has been disconnected!", logPrefix);
        });
    }

    public logEvent(value: string, prefix: string = ""): void {
        if (this.logString === "No logs yet...") {
            this.logString = "";
        }

        this.logString += `\n ${ prefix } ${ value }`;
    }

    public loadCameraPreview(): void {
        this.cameraPreview.startCamera(this.cameraPreviewOptions).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                this.logEvent(err, "[Cordova Camera Preview Error]");
                console.log(err)
            });
    }

    public useCaptuvoDefaultEvents(): void {
        const logPrefix: string = "[Captuvo]";

        captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
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
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }

    public useCaptuvoWindowPluginsEvents(): void {
        const logPrefix: string = "[Captuvo Window Plugins]";

        window.plugins.captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
        });

        window.plugins.captuvo.registerMagstripeCallback(function (track) {
            //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                let result = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        window.plugins.captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }

    public useCaptuvoWindowEvents(): void {
        const logPrefix: string = "[Captuvo Window]";

        window.captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
        });

        window.captuvo.registerMagstripeCallback(function (track) {
            //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                let result = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        window.captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }

    public useCaptuvoFullNameDefaultEvents(): void {
        const logPrefix: string = "[Captuvo FN]";

        captuvo.com.bluefletch.honeywell.captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
        });

        captuvo.com.bluefletch.honeywell.captuvo.registerMagstripeCallback(function (track) {
            //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                let result = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        captuvo.com.bluefletch.honeywell.captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }

    public useCaptuvoWindowFullNamePluginsEvents(): void {
        const logPrefix: string = "[Captuvo Window Plugins FN]";

        window.plugins.com.bluefletch.honeywell.captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
        });

        window.plugins.com.bluefletch.honeywell.captuvo.registerMagstripeCallback(function (track) {
            //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                let result = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        window.plugins.com.bluefletch.honeywell.captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }

    public useCaptuvoFullNameWindowEvents(): void {
        const logPrefix: string = "[Captuvo Window FN]";

        window.com.bluefletch.honeywell.captuvo.registerScannerCallback(function (barcode) {
            this.logEvent(`Barcode scanned: ${ barcode }`, logPrefix);
        });

        window.com.bluefletch.honeywell.captuvo.registerMagstripeCallback(function (track) {
            //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
            if (track.indexOf("%B") == 0) {
                track = track.split('^');

                let result = {
                    number: track[0].substr(2), //strip leading %B
                    name: track[1].trim(),
                    expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                };
                
                this.logEvent(`Magstripe event. Result: ${ result }`, logPrefix);
            }
        });

        window.com.bluefletch.honeywell.captuvo.startScanning(function (data) {
            this.logEvent(`Start scanning: ${ data }`, logPrefix);
        });
    }
}



// document.addEventListener("deviceready", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[HomePage Outside] Device is ready");
//     element.appendChild(text);

//     captuvo.registerScannerCallback(function (barcode) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[HomePage Outside] Barcode scanned: ${ barcode }`);
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
//             let text = document.createTextNode(`\n[HomePage Outside] Magstripe event. Result: ${ result }`);
//             element.appendChild(text);
//         }
//     });

//     captuvo.startScanning(function (data) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[HomePage Outside] Start scanning: ${ data }`);
//         element.appendChild(text);
//     });
// });

// document.addEventListener("magstripeReady", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[HomePage Outside] MSR (or device) is ready!");
//     element.appendChild(text);
// });

// document.addEventListener("scannerReady", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[HomePage Outside] Barcode scanner is ready!");
//     element.appendChild(text);
// });

// document.addEventListener("captuvoConnected", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[HomePage Outside] Captuvo sled is connected!");
//     element.appendChild(text);

//     captuvo.registerBatteryCallback(function (data) {
//         let element = document.getElementById("log-text");
//         let text = document.createTextNode(`\n[HomePage Outside] Start scanning: ${ data }`);
//         element.appendChild(text);
//     });
// });

// document.addEventListener("captuvoDisconnected", function () {
//     let element = document.getElementById("log-text");
//     let text = document.createTextNode("\n[HomePage Outside] Captuvo sled has been disconnected!");
//     element.appendChild(text);
// });