import { Component } from '@angular/core';
import { RxSpeechRecognitionService,  resultList } from '@kamiazya/ngx-speech-recognition';

@Component({
  selector: 'app-scribe',
  templateUrl: './scribe.component.html',
  styleUrls: ['./scribe.component.css'],
  providers: [
    RxSpeechRecognitionService,
  ]
})
export class ScribeComponent {

  message = '';

  constructor(
      public service: RxSpeechRecognitionService,
  ) { }

  listen() {
    this.service
        .listen()
        .pipe(resultList)
        .subscribe((list: SpeechRecognitionResultList) => {
          this.message = list.item(0).item(0).transcript;
          console.log('RxComponent:onresult', this.message, list);
        });
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/