import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@awesome-cordova-plugins/camera-preview/ngx';

declare let captuvo: any;

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

        document.addEventListener("deviceready", function () {
            captuvo.registerScannerCallback(function (barcode) {
                this.logEvent(`Barcode scanned: ${ barcode }`);
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
                    
                    this.logEvent(`Magstripe event. Result: ${ result }`);
                }
            });

            captuvo.startScanning(function (data) {
                this.logEvent(`Start scanning: ${ data }`);
            });
        });

        document.addEventListener("magstripeReady", function () {
            this.logEvent("MSR (or device) is ready!");
        });

        document.addEventListener("scannerReady", function () {
            this.logEvent("Barcode scanner is ready!");
        });

        document.addEventListener("captuvoConnected", function () {
            this.logEvent("Captuvo sled is connected!");

            captuvo.registerBatteryCallback(function (data) {
                this.logEvent(`Start scanning: ${ data }`);
            });
        });

        document.addEventListener("captuvoDisconnected", function () {
            this.logEvent("Captuvo sled has been disconnected!");
        });
    }

    private loadCameraPreview(): void {
        this.cameraPreview.startCamera(this.cameraPreviewOptions).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            });
    }

    private logEvent(value: string): void {
        if (this.logString === "") {
            this.logString = "";
        }

        this.logString += `\n${ value }`;
    }
}
