import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddGroupPage} from './add-group-page';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AddGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGroupPage),
    CommonModule
  ],
  exports: [
    AddGroupPage
  ]
})
export class AddGroupPageModule {
}
