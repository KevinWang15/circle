import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GroupMemberSelector} from './group-member-selector';
import {CommonModule} from "@angular/common";
import {GroupMemberSelectionPageModule} from "../../pages/group-member-selection-page/group-member-selection-page.module";

@NgModule({
  declarations: [
    GroupMemberSelector,
  ],
  imports: [
    IonicPageModule.forChild(GroupMemberSelector),
    CommonModule,
    GroupMemberSelectionPageModule
  ],
  exports: [
    GroupMemberSelector
  ]
})
export class GroupMemberSelectorModule {
}
