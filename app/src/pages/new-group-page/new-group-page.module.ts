import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewGroupPage } from './new-group-page';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    NewGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(NewGroupPage),
    CommonModule
  ],
  exports: [
    NewGroupPage
  ]
})
export class NewGroupPageModule {}
