import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum-page';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
  ],
  exports: [
    ForumPage
  ]
})
export class ForumPageModule {}
