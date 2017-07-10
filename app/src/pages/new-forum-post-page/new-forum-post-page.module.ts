import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewForumPostPage} from './new-forum-post-page';
import {FroalaEditorModule} from "../../lib/angular2-froala-wysiwyg/editor/editor.module";
import {GroupMemberSelectorModule} from "../../components/group-member-selector/group-member-selector.module";

@NgModule({
  declarations: [
    NewForumPostPage,
  ],
  imports: [
    IonicPageModule.forChild(NewForumPostPage),
    FroalaEditorModule.forRoot(),
    GroupMemberSelectorModule
  ],
  exports: [
    NewForumPostPage
  ]
})
export class NewForumPostPageModule {
}
