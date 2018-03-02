import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GroupMemberSelectionPage} from './group-member-selection-page';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    GroupMemberSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupMemberSelectionPage),
    CommonModule
  ],
  exports: [
    GroupMemberSelectionPage
  ]
})
export class GroupMemberSelectionPageModule {
}
