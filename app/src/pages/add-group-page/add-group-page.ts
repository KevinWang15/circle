import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Util} from "../../services/singleton/util";
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";

/**
 * Generated class for the AddGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-group-page',
  templateUrl: 'add-group-page.html',
})
export class AddGroupPage {
  formData = {password: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }

  submit() {
    this.api.request("group.join", {password: this.formData.password}, {}).then((data) => {
      setTimeout(() => {
        this.util.showToast("加入成功");
        setTimeout(() => {
          this.navParams.data.reload();
        }, 1000);
        this.navCtrl.pop();
      }, 300);
    }).catch(noop)
  }
}
