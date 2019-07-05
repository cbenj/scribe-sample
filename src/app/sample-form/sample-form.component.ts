import {Component, ElementRef, ViewChild} from '@angular/core';
import Speech from "speak-tts";
import {SampleForm} from "./sample-form";
import {resultList, SpeechRecognitionService} from "@kamiazya/ngx-speech-recognition";

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css'],
  providers: [
    SpeechRecognitionService,
  ]
})
export class SampleFormComponent {

  sampleForm: SampleForm;
  scribeEnabled: boolean;
  innovativeValues = ["Yes", "No", "Maybe"]
  player: any
  scribePlayer : any;
  @ViewChild('valueProposition',  {static: false}) valueProposition: ElementRef;
  @ViewChild('projectName',  {static: false}) projectName: ElementRef;
  @ViewChild('innovative',  {static: false}) innovative: ElementRef;
  @ViewChild('startSolution',  {static: false}) startSolution: ElementRef;
  @ViewChild('userSolution',  {static: false}) userSolution: ElementRef;
  @ViewChild('customerSolution',  {static: false}) customerSolution: ElementRef;
  @ViewChild('submitbtn',  {static: false}) submitbtn: ElementRef;

  constructor(public service: SpeechRecognitionService) {
    this.player = new Speech();
    this.player
        .init({
          volume: 0.5,
          lang: "fr-FR",
          rate: 1,
          pitch: 1,
          voice:'Thomas',
          //'splitSentences': false,
          // listeners: {
          //    onvoiceschanged: voices => {
          //        console.log("Voices changed", voices);
          //    }
          //}
        });
    this.scribePlayer = new Speech();
    this.scribePlayer
        .init({
          volume: 0.5,
          lang: "fr-FR",
          rate: 1,
          pitch: 1,
          voice:'Google français'
        });
    this.sampleForm = new SampleForm();
    this.scribeEnabled = false;
  }

  projectNameQuestion() {

    this.scribePlayer.speak({
      text: 'Quel est le nom de votre projet ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: 'Spik tou scribe',
            listeners: {
              onend: () => {
                this.sampleForm["projectName"] = "speak to scribe";
                this["valueProposition"].nativeElement.focus();
              }
            }
          })
        }
      }
    });

  }

  innovativeQuestion() {
    this.scribePlayer.speak({
      text: 'Etes-vous vraiment innovant ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: 'Absolument',
            listeners: {
              onend: () => {
                this.sampleForm["innovative"] = "Absolument";
                this["startSolution"].nativeElement.focus();
              }
            }
          })
        }
      }
    });
  }

  valuePropositionQuestion() {
    this.scribePlayer.speak({
      text: 'Quelle est votre proposition de valeur ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: "L'égalité face aux démarches !",
            listeners: {
              onend: () => {
                this.sampleForm["valueProposition"] = "L'égalité face aux démarches";
                this["innovative"].nativeElement.focus();
              }
            }
          })
        }
      }
    });
  }

  startSolutionQuestion() {
    this.scribePlayer.speak({
      text: 'Quand avez vous imaginé votre solution ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: "Pour l'innovathon 2019 !",
            listeners: {
              onend: () => {
                this.sampleForm["startSolution"] = "Pour l'innovathon 2019";
                this["customerSolution"].nativeElement.focus();
              }
            }
          })
        }
      }
    });
  }

  customersIdentifiedQuestion() {
    this.scribePlayer.speak({
      text: 'Quels sont les clients potentiels ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: 'Toute entreprise, administration, collectivités !',
            listeners: {
              onend: () => {
                this.sampleForm["customerSolution"] = "Toute entreprise, administration, collectivités";
                this["userSolution"].nativeElement.focus();
              }
            }
          })
        }
      }
    });

  }

  useSolutionQuestion() {
    this.scribePlayer.speak({
      text: 'A qui s adresse-t-il ?',
      listeners: {
        onend: () => {
          this.player.speak({
            text: 'A tousse',
            listeners: {
              onend: () => {
                this.sampleForm["userSolution"] = "A tous";
                this["submitbtn"].nativeElement.focus();
              }
            }
          })
        }
      }
    });
  }

  listen(fieldname: string, nextInputFocus?: string) {
    if (this.scribeEnabled ) {

      this.service.start();
      this.service.onresult = (e) => {
        this.sampleForm[fieldname] = e.results[0].item(0).transcript;
        console.log('RxComponent:onresult', this.sampleForm[fieldname], e);
        if (nextInputFocus != null) {
          this[nextInputFocus].nativeElement.focus();
        }
        this.service.stop();
      };
    }
  }

  submit() {
    window.alert('submit !');
  }

  enableScribe() {
    if (!this.scribeEnabled) {
      this.scribeEnabled = true;
    }
    this.projectName.nativeElement.focus()
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/