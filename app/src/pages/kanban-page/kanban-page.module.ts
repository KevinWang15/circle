import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {KanbanPage} from './kanban-page';
import {KanbanItemModule} from "../../components/kanban-item/kanban-item.module";
import {NewKanbanPageModule} from "../new-kanban-page/new-kanban-page.module";
import {NewKanbanSubTaskPageModule} from "../new-kanban-sub-task-page/new-kanban-sub-task-page.module";
import {KanbanMoveToNextStagePageModule} from "../kanban-move-to-next-stage-page/kanban-move-to-next-stage-page.module";

@NgModule({
  declarations: [
    KanbanPage,
  ],
  imports: [
    IonicPageModule.forChild(KanbanPage),
    KanbanItemModule,
    NewKanbanPageModule,
    NewKanbanSubTaskPageModule,
    KanbanMoveToNextStagePageModule
  ],
  exports: [
    KanbanPage
  ]
})
export class KanbanPageModule {
}
