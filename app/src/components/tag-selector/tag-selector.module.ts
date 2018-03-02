import {NgModule} from '@angular/core';
import {IonicModule, IonicPage, IonicPageModule} from 'ionic-angular';
import {TagSelector} from './tag-selector';

@NgModule({
  declarations: [
    TagSelector,
  ],
  imports: [
    IonicPageModule.forChild(TagSelector),
  ],
  exports: [
    TagSelector
  ]
})
export class TagSelectorModule {
}
