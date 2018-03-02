import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Kanban} from "../../pages/kanban-page/kanban-page";
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
import {checkAndUpdateTextInline} from "@angular/core/src/view/text";

/**
 * Generated class for the KanbanItem component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'kanban-item',
  templateUrl: 'kanban-item.html'
})
export class KanbanItem {

  @Input() data: Kanban;
  @Output() onNewSubTask: EventEmitter<null> = new EventEmitter();
  @Output() onMoveToNextStage: EventEmitter<null> = new EventEmitter();

  constructor(private api: Api, private util: Util) {
  }

  newSubTask() {
    this.onNewSubTask.emit();
  }

  setSubTaskFinished(subtask) {
    this.api.request('kanban.set-subtask-finished',
      {
        id: subtask.id,
        finished: subtask.finished
      }, {}).then(() => {
      if (subtask.finished) {
        this.util.showToast(subtask.title + " 已完成");
      } else {
        this.util.showToast("取消 " + subtask.title + " 完成");
      }
    });
  }

  moveToNextStage() {
    this.onMoveToNextStage.emit();
  }
}
