import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../services/singleton/api";
import {NewKanbanPage} from "../new-kanban-page/new-kanban-page";
import {User} from "../../services/singleton/user";
import {NewKanbanSubTaskPage} from "../new-kanban-sub-task-page/new-kanban-sub-task-page";
import {KanbanMoveToNextStagePage} from "../kanban-move-to-next-stage-page/kanban-move-to-next-stage-page";
import {Util} from "../../services/singleton/util";

export interface KanbanSubTask {
  id: number;
  kanban_id: number;
  kanban_stage: number;
  title: string;
  finished: boolean;
  deadline: string;
  assigned_to: Array<User>;
}

export interface Kanban {
  id: number;
  stage: number;
  title: string;
  next_stage_deadline: string;
  created_at: string;
  group_id: number;
  subtasks: Array<KanbanSubTask>;
  assigned_to: Array<User>;
}
@IonicPage()
@Component({
  selector: 'page-kanban-page',
  templateUrl: 'kanban-page.html',
})
export class KanbanPage {
  public list: { [stage: string]: Array<Kanban> } = {
    planning: [],
    doing: [],
    done: [],
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    // navParams.data.groupData.id
    this.loadData();
  }

  private loadData($event = null) {
    this.api.request("kanban.ls", {group_id: this.navParams.data.groupData.id}, {}).then((data: Array<Kanban>) => {

      this.list['planning'] = data.filter((value) => {
        return value.stage == 0;
      });

      this.list['doing'] = data.filter((value) => {
        return value.stage == 1;
      });

      this.list['done'] = data.filter((value) => {
        return value.stage == 2;
      });

      if ($event) {
        $event.complete();
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KanbanPage');
  }

  newKanban() {
    this.navCtrl.push(NewKanbanPage,
      {
        groupData: this.navParams.data.groupData,
        reload: this.loadData.bind(this)
      }
    );
  }

  newSubTask(kanban: Kanban) {
    this.navCtrl.push(NewKanbanSubTaskPage,
      {
        kanbanData: kanban,
        reload: this.loadData.bind(this)
      })
  }

  moveToNextStage(kanban: Kanban) {
    if (kanban.stage == 0) {

      this.navCtrl.push(KanbanMoveToNextStagePage,
        {
          kanbanData: kanban,
          reload: this.loadData.bind(this)
        })
    } else {
      this.util.confirm("确定设置为已完成？").then((res) => {
        if (res) {
          this.api.request('kanban.next-stage',
            {
              id: kanban.id,
              next_stage_deadline: '1970-1-1 00:00:00',
            },
            {}).then((data) => {
            this.util.showToast("任务已完成");
            this.loadData();
          });
        }
      });
    }
  }
}
