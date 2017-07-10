import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KanbanDetailPage } from './kanban-detail-page';

@NgModule({
  declarations: [
    KanbanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(KanbanDetailPage),
  ],
  exports: [
    KanbanDetailPage
  ]
})
export class KanbanDetailPageModule {}
