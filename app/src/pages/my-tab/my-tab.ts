import {Component, EventEmitter, Output} from '@angular/core';
import {App, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import {env} from "../../config/environment";
import {Util} from "../../services/singleton/util";
import {Api} from "../../services/singleton/api";
import {Login} from "../login/login";
import {EditProfilePage} from "../edit-profile-page/edit-profile-page";

/**
 * Generated class for the MyTab page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-tab',
  templateUrl: 'my-tab.html',
})
export class MyTab {
  public hideGroup: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Util, private alertCtrl: AlertController, private app: App, private api: Api, public user: User) {
  }

  modifyInfo() {
    this.navCtrl.push(EditProfilePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTab');
  }

  emit(data: any) {
    Util.pub(data);
  }

  logout() {
    this.user.logout();
    this.util.confirm("确定要登出吗?").then(res => {
      if (res)
        this.app.getRootNav().setRoot(Login);
    });
  }
}
