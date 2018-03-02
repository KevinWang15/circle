import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import * as dateFns from 'date-fns';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
import {Kanban} from "../kanban-page/kanban-page";

/**
 * Generated class for the NewKanbanSubTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-kanban-sub-task-page',
  templateUrl: 'new-kanban-sub-task-page.html',
})
export class NewKanbanSubTaskPage {

  public kanban: Kanban;
  public formData = {
    kanban_id: 0,
    title: "",
    deadline: null,
    assigned_to: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    this.formData.deadline = dateFns.format((dateFns.startOfDay(dateFns.addDays(new Date(), 7))), "YYYY-MM-DD");
    this.kanban = navParams.data.kanbanData;
    this.formData.kanban_id = this.kanban.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewKanbanSubTaskPage');
  }

  save() {
    this.api.request('kanban.create-subtask',
      this.formData,
      {}).then((data) => {
      this.util.showToast("创建成功");
      this.navCtrl.pop();
      this.navParams.data.reload();
    });
    console.log(this.formData);
  }
}
