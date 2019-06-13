import { Component } from '@angular/core';
import Speech from "speak-tts";

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent {

  genders = ["Mr", "Ms"]
  player : any

  constructor() {
    this.player = new Speech();
    this.player
        .init({
          volume: 0.5,
          lang: "en-GB",
          rate: 1,
          pitch: 1,
          //'voice':'Google UK English Male',
          //'splitSentences': false,
          listeners: {
            onvoiceschanged: voices => {
              console.log("Voices changed", voices);
            }
          }
        })

  }

  sayQuestion1() {
    this.player.speak({
      text:'What is your gender ?'});
  }

  sayQuestion2() {
    this.player.speak({
      text:'What is your name ?'});
  }


  submit() {
    window.alert('submit !');
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/