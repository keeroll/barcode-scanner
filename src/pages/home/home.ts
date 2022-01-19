import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare let captuvo: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public logString: string = "";
    constructor(public navCtrl: NavController) {

    }

    public ngOnInit(): void {
        document.addEventListener("deviceready", function() {
            captuvo.registerScannerCallback(function (barcode) {
                this.logString = `Barcode scanned: ${ barcode }`;
            });

            captuvo.registerMagstripeCallback(function (track) {
                //track 1 uses carets as dividers (NOTE: won't work if track 2 is read)
                if (track.indexOf("%B") == 0) {
                    track = track.split('^');
    
                    var cc = {
                        number: track[0].substr(2), //strip leading %B
                        name: track[1].trim(),
                        expr: '20' + track[2].substr(0, 2) + '-' + track[2].substr(2, 2)
                    };
                } else {
                    //handle track 2
                }
    
            })
        });

        document.addEventListener("magstripeReady", function() {
            this.logString("MSR (or device) is ready");
        });
    }
}
