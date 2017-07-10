import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewKanbanSubTaskPage} from './new-kanban-sub-task-page';
import {GroupMemberSelectorModule} from "../../components/group-member-selector/group-member-selector.module";

@NgModule({
  declarations: [
    NewKanbanSubTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(NewKanbanSubTaskPage),
    GroupMemberSelectorModule
  ],
  exports: [
    NewKanbanSubTaskPage
  ]
})
export class NewKanbanSubTaskPageModule {
}
