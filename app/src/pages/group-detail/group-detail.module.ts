import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GroupDetail} from './group-detail';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    GroupDetail,
  ],
  imports: [
    IonicPageModule.forChild(GroupDetail),
    CommonModule
  ],
  exports: [
    GroupDetail
  ]
})
export class GroupDetailModule {
}
