import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPostDetailPage } from './forum-post-detail-page';
import {AvatarArrayModule} from "../../components/avatar-array/avatar-array.module";

@NgModule({
  declarations: [
    ForumPostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPostDetailPage),
    AvatarArrayModule
  ],
  exports: [
    ForumPostDetailPage
  ]
})
export class ForumPostDetailPageModule {}
