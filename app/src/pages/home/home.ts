import {Component, ViewChild} from '@angular/core';
import {NavController, Tabs} from 'ionic-angular';
import {Config} from '../../config/config';
import {Api} from '../../services/singleton/api';
import {Util} from "../../services/singleton/util";
import {User} from "../../services/singleton/user";
import {GroupTab} from "../group-tab/group-tab";
import {MyTab} from "../my-tab/my-tab";
import {MessageTab} from "../message-tab/message-tab";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class Home {
  public groupTab = GroupTab;
  public messageTab = MessageTab;
  public myTab = MyTab;
  public loading = true;

  @ViewChild('myTabs') tabRef: Tabs;

  onMessage(message: Object) {
    if (message['type'] == 'navigate') {
      this.tabRef.select(0);
    }
  }

  constructor(public navCtrl: NavController) {
    this.loading = false;
    Util.sub(this.onMessage.bind(this));
  }
}
