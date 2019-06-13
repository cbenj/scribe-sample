import {Component} from '@angular/core';
import Speech from "speak-tts";
import {SampleForm} from "./sample-form";
import {ScribeComponent} from "../scribe-component/scribe.component";

@Component({
    selector: 'app-sample-form',
    templateUrl: './sample-form.component.html',
    styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent {

    sampleForm: SampleForm;
    scribeEnabled: boolean;
    innovative = ["Yes", "No", "Maybe"]
    player: any

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
            });
        this.sampleForm = new SampleForm();
        this.scribeEnabled = false;
    }

    projectNameQuestion() {
        this.player.speak({
            text: 'What is your project name ?'
        });
    }

    innovativeQuestion() {
        this.player.speak({
            text: 'Are you really innovative?'
        });
    }

    valuePropositionQuestion() {
        this.player.speak({
            text: 'What is your proposition of value ?'
        });
    }

    startSolutionQuestion() {
      this.player.speak({
        text: 'When did you start to imagine the solution ?'
      });
    }

    customersIdentifiedQuestion() {
      this.player.speak({
        text: 'Which customers have you identified ?'
      });
    }

    useSolutionQuestion() {
      this.player.speak({
        text: 'Who will use the solution ?'
      });
    }

    submit() {
        window.alert('submit !');
    }

    enableScribe() {
        if (!this.scribeEnabled) {
            this.scribeEnabled = true;
        }
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/