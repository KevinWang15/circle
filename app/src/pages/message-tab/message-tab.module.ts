import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageTab} from './message-tab';
import {FroalaEditorModule} from "../../lib/angular2-froala-wysiwyg/editor/editor.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MessageTab,
  ],
  imports: [
    IonicPageModule.forChild(MessageTab),
    CommonModule
  ],
  exports: [
    MessageTab
  ]
})
export class MessageTabModule {
}
