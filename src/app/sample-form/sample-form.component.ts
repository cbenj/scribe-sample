import {Component, ElementRef, ViewChild} from '@angular/core';
import Speech from "speak-tts";
import {SampleForm} from "./sample-form";
import {resultList, RxSpeechRecognitionService} from "@kamiazya/ngx-speech-recognition";

@Component({
    selector: 'app-sample-form',
    templateUrl: './sample-form.component.html',
    styleUrls: ['./sample-form.component.css'],
    providers: [
        RxSpeechRecognitionService,
    ]
})
export class SampleFormComponent {

    sampleForm: SampleForm;
    scribeEnabled: boolean;
    innovative = ["Yes", "No", "Maybe"]
    player: any

    @ViewChild('valueProposition',  {static: false}) valueProposition: ElementRef;

    constructor(public service: RxSpeechRecognitionService) {
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
        this.listen("projectName", "valueProposition");
    }

    innovativeQuestion() {
        this.player.speak({
            text: 'Are you really innovative?'
        });
        this.listen("innovative");
    }

    valuePropositionQuestion() {
        this.player.speak({
            text: 'What is your proposition of value ?'
        });
        this.listen("valueProposition", "innovative");
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
    listen(fieldname: string, nextInputFocus?: string) {
        if (this.scribeEnabled) {
            this.service
                .listen()
                .pipe(resultList)
                .subscribe((list: SpeechRecognitionResultList) => {
                    this.sampleForm[fieldname] = list.item(0).item(0).transcript;
                    console.log('RxComponent:onresult', this.sampleForm[fieldname], list);
                    if (nextInputFocus != null) {
                        this.valueProposition.nativeElement.focus();
                    }
                });
        }
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