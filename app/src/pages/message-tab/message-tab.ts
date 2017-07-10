import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";
import {Util} from "../../services/singleton/util";

/**
 * Generated class for the MessageTab page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-message-tab',
  templateUrl: 'message-tab.html',
})
export class MessageTab {

  public list: Array<any>;

  loadData($event = null) {
    this.api.request('user.my-updates', {}, {}).then((value: any) => {
      this.list = value;
      if ($event) {
        $event.complete();
      }
    }).catch(noop);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.loadData();
  }

  onClick(item) {
    console.log(item.action_json);
    let action = {};
    try {
      action = JSON.parse(item.action_json);
    } catch (ex) {
      action = {};
    }
    switch (action['navigate']) {
      case 'kanban':
        Util.pub(
          {'type': 'navigate', group_id: item.group_id, sub: 'kanban'}
        );
        break;
      case 'forum':
        Util.pub(
          {'type': 'navigate', group_id: item.group_id, sub: 'forum'}
        );
        break;
      case 'album':
        Util.pub(
          {'type': 'navigate', group_id: item.group_id, sub: 'album'}
        );
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageTab');
  }
}
