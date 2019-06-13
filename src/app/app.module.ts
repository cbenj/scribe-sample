import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCommonModule, MatInputModule, MatSelectModule, MatOptionModule, MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { SpeechRecognitionModule } from '@kamiazya/ngx-speech-recognition';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SampleFormComponent },
    ]),
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCommonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule],
  exports:
      [MatButtonModule, MatCheckboxModule, MatCommonModule, MatInputModule,  MatSelectModule, MatOptionModule, MatIconModule],
  declarations: [
    AppComponent,
    SampleFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/