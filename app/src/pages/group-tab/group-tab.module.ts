import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GroupTab} from './group-tab';
import {GroupItemModule} from "../../components/group-item/group-item.module";
import {RatingBarModule} from "../../components/rating-bar/rating-bar.module";
@NgModule({
  declarations: [
    GroupTab,
  ],
  imports: [
    IonicPageModule.forChild(GroupTab),
    GroupItemModule,
    RatingBarModule,
  ],
  exports: [
    GroupTab
  ]
})
export class GroupTabModule {
}
