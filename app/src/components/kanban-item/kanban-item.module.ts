import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KanbanItem } from './kanban-item';

@NgModule({
  declarations: [
    KanbanItem,
  ],
  imports: [
    IonicPageModule.forChild(KanbanItem),
  ],
  exports: [
    KanbanItem
  ]
})
export class KanbanItemModule {}
