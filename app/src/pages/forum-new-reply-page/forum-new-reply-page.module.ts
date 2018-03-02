import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ForumNewReplyPage} from './forum-new-reply-page';
import {FroalaEditorModule} from "../../lib/angular2-froala-wysiwyg/editor/editor.module";

@NgModule({
  declarations: [
    ForumNewReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumNewReplyPage),
    FroalaEditorModule.forRoot(),

  ],
  exports: [
    ForumNewReplyPage
  ]
})
export class ForumNewReplyPageModule {
}
