import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as dateFns from 'date-fns';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
/**
 * Generated class for the KanbanMoveToNextStagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kanban-move-to-next-stage-page',
  templateUrl: 'kanban-move-to-next-stage-page.html',
})
export class KanbanMoveToNextStagePage {

  public formData = {
    next_stage_deadline: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    this.formData.next_stage_deadline = dateFns.format((dateFns.startOfDay(dateFns.addMonths(new Date(), 1))), "YYYY-MM-DD");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KanbanMoveToNextStagePage');
  }

  save() {
    this.api.request('kanban.next-stage',
      {
        id: this.navParams.data.kanbanData.id,
        next_stage_deadline: this.formData.next_stage_deadline,
      },
      {}).then((data) => {
      this.util.showToast("成功进入下一阶段");
      this.navCtrl.pop();
      this.navParams.data.reload();
    });
  }
}
