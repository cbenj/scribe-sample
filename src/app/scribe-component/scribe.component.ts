import {Component, Input} from '@angular/core';
import {RxSpeechRecognitionService, resultList} from '@kamiazya/ngx-speech-recognition';

@Component({
    selector: 'app-scribe',
    template: '',
    styleUrls: ['./scribe.component.css'],
    providers: [
        RxSpeechRecognitionService,
    ]
})
export class ScribeComponent {

    message = '';

    @Input() fieldname: any;
    @Input() isEnabled: boolean;

    constructor(
        public service: RxSpeechRecognitionService,
    ) {
    }

    listen() {
        if (this.isEnabled) {
            this.service
                .listen()
                .pipe(resultList)
                .subscribe((list: SpeechRecognitionResultList) => {
                    this.fieldname = list.item(0).item(0).transcript;
                    console.log('RxComponent:onresult', this.message, list);
                });
        }
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/