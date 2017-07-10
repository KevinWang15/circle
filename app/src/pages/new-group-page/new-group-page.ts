import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
import {noop} from "rxjs/util/noop";

/**
 * Generated class for the NewGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-group-page',
  templateUrl: 'new-group-page.html',
})
export class NewGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGroupPage');
  }

  formData = {name: ""};

  save() {
    this.api.request("group.create", {name: this.formData.name}, {}).then((data) => {
      setTimeout(() => {
        this.util.showToast("恭喜，创建成功。\n要邀请别的用户进入您的圈子，请至圈子右上角复制圈子口令并发送给好友。", 8000);
        setTimeout(() => {
          this.navParams.data.reload();
        }, 1000);
        this.navCtrl.pop();
      }, 300);
    }).catch(noop);
  }
}
