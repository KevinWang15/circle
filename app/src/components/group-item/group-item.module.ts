import {NgModule} from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {GroupItem} from './group-item';

@NgModule({
  declarations: [
    GroupItem,
  ],
  imports: [
    IonicPageModule.forChild(GroupItem),
  ],
  exports: [
    GroupItem
  ]
})
export class GroupItemModule {
}
