import {NgModule} from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {RatingBar} from './rating-bar';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    RatingBar,
  ],
  imports: [
    IonicPageModule.forChild(RatingBar),
    CommonModule
  ],
  exports: [
    RatingBar
  ]
})
export class RatingBarModule {
}
