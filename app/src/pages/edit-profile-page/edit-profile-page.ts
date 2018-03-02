import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import {Util} from "../../services/singleton/util";
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";

/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-profile-page',
  templateUrl: 'edit-profile-page.html',
})
export class EditProfilePage {

  formData = {
    name: this.user.name || "",
    mobile: this.user.mobile || "",
    email: this.user.email || "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public util: Util, public api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  save() {
    if (!this.util.validateEmail(this.formData.email)) {
      this.util.showToast("Email地址无效");
      return;
    }

    this.api.request('user.edit-profile', {
      email: this.formData.email,
      name: this.formData.name,
      mobile: this.formData.mobile,
    }, {}).then(() => {
      this.util.showToast("修改成功");
      this.user.name = this.formData.name;
      this.user.mobile = this.formData.mobile;
      this.user.email = this.formData.email;
      this.navCtrl.pop();
      return;
    }).catch(noop);
  }
}
