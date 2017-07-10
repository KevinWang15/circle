import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api, groupInterface} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";
import {Storage} from "@ionic/storage";
import {GroupDetail} from "../group-detail/group-detail";
import {Util} from "../../services/singleton/util";
import {AddGroupPage} from "../add-group-page/add-group-page";
import {NewGroupPage} from "../new-group-page/new-group-page";

/**
 * Generated class for the GroupTab page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-tab',
  templateUrl: 'group-tab.html',
})
export class GroupTab {
  public segment: string = 'my';
  public myGroups: Array<groupInterface> = [];

  onMessage(message: Object) {
    if (message['type'] == 'navigate') {
      // console.log(message["group_id"]);
      let target_group = this.myGroups.filter((item) => {
        return item.id == message["group_id"];
      })[0];
      this.showGroupDetail(target_group, message['sub']);
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private api: Api, private storage: Storage, private app: App) {
    this.loadData();
    Util.sub(this.onMessage.bind(this));
  }

  private loadData($event = null) {
    this.api.myGroups().then(value => {
      value.forEach(item => {
        this.storage.get('group_last_update_viewed_id_' + item.id).then(value => {
          item.badge_hidden = value == item.group_update_id;
          if ($event) {
            $event.complete();
          }
        });
      });
      this.myGroups = value;
    }).catch(noop);
  }

  showGroupDetail(item: groupInterface, autoOpenSub: string = '') {
    this.navCtrl.push(GroupDetail, {
      groupData: item,
      reload: this.loadData.bind(this),
      autoOpenSub
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupTab');
  }

  showAddGroup() {
    this.navCtrl.push(AddGroupPage, {
      reload: this.loadData.bind(this),
    });
  }

  showNewGroup() {
    this.navCtrl.push(NewGroupPage, {
      reload: this.loadData.bind(this),
    });

  }

}
