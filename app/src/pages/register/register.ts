import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Util} from "../../services/singleton/util";
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  formData = {
    name: "",
    password: "",
    email: "",
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Util, private api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }


  submit() {
    if (!this.util.validateEmail(this.formData.email)) {
      this.util.showToast("Email地址无效");
      return;
    }
    if (this.formData.password.length < 8) {
      this.util.showToast("密码长度至少8位");
      return;
    }
    this.api.request('user.register', {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name
    }, {}).then(() => {
      this.util.showToast("注册成功");
      this.navParams.data.onSuccess(this.formData.email, this.formData.password);
      this.navCtrl.pop();
      return;
    }).catch(noop);
  }

}
