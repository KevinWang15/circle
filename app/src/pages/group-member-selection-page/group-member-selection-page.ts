import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import {Api} from "../../services/singleton/api";

/**
 * Generated class for the GroupMemberSelectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-member-selection-page',
  templateUrl: 'group-member-selection-page.html',
})
export class GroupMemberSelectionPage {

  data: Array<User>;
  group_id: number;
  public list: Array<User | any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.data = this.navParams.data.data;
    this.group_id = this.navParams.data.group_id;
    api.request("group.members", {id: this.group_id}, {}).then((data: any) => {
      this.list = data;
      let selected = [];
      this.data.forEach(item => {
        selected[item.id] = true;
      });
      this.list.forEach(item => {
        if (selected[item.id])
          item.selected = true;
      });
    });
  }

  ionViewDidLoad() {
  }

  submit() {
    this.data.splice(0);
    this.list.forEach((item) => {
      if (item.selected) {
        this.data.push(item);
        delete item.selected;
      }
    });
    this.navCtrl.pop();
  }
}
