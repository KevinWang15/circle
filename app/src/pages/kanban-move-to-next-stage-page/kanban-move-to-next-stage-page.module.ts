import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KanbanMoveToNextStagePage } from './kanban-move-to-next-stage-page';

@NgModule({
  declarations: [
    KanbanMoveToNextStagePage,
  ],
  imports: [
    IonicPageModule.forChild(KanbanMoveToNextStagePage),
  ],
  exports: [
    KanbanMoveToNextStagePage
  ]
})
export class KanbanMoveToNextStagePageModule {}
