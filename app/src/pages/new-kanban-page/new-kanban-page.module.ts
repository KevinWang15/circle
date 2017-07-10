import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NewKanbanPage} from './new-kanban-page';
import {GroupMemberSelectorModule} from "../../components/group-member-selector/group-member-selector.module";

@NgModule({
  declarations: [
    NewKanbanPage,
  ],
  imports: [
    IonicPageModule.forChild(NewKanbanPage),
    GroupMemberSelectorModule
  ],
  exports: [
    NewKanbanPage
  ]
})
export class NewKanbanPageModule {
}
