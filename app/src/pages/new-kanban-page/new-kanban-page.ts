import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as dateFns from 'date-fns';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
/**
 * Generated class for the NewKanbanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-kanban-page',
  templateUrl: 'new-kanban-page.html',
})
export class NewKanbanPage {

  public formData = {
    title: "",
    stage: 0,
    next_stage_deadline: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    this.formData.next_stage_deadline = dateFns.format((dateFns.startOfDay(dateFns.addMonths(new Date(), 1))), "YYYY-MM-DD");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewKanbanPage');
  }

  save() {
    this.api.request('kanban.create',
      {
        group_id: this.navParams.data.groupData.id,
        title: this.formData.title,
        stage: this.formData.stage,
        next_stage_deadline: this.formData.next_stage_deadline,
      },
      {}).then((data) => {
      this.util.showToast("创建成功");
      this.navCtrl.pop();
      this.navParams.data.reload();
    });
    console.log(this.formData);
  }

}
