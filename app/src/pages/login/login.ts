import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import {Util} from "../../services/singleton/util";
import {Home} from "../home/home";
import {noop} from "rxjs/util/noop";
import {Config} from "../../config/config";
import {Register} from "../register/register";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  constructor(private user: User, private util: Util, private storage: Storage, private config: Config, private navCtrl: NavController, private viewCtrl: ViewController) {
    this.storage.get('email').then(data => {
      if (data) this.formData.email = data;
    });
  }

  private formData = {
    email: "",
    password: "",
  };

  public register() {
    // this.navCtrl.setRoot(Register, {}, {animate: true, direction: "forward"})
    this.navCtrl.push(Register, {
      onSuccess: (email, password) => {
        this.formData.email = email;
        this.formData.password = password;
        setTimeout(() => {
          this.login();
        }, 1000);
      }
    }, {animate: true, direction: "forward"})
  }

  public login() {
    if (!this.formData.email) {
      this.util.showToast("Email不能为空");
      return;
    }

    if (!this.formData.password) {
      this.util.showToast("密码不能为空");
      return;
    }

    this.user.login(this.formData.email, this.formData.password)
      .then(() => {
        this.navCtrl.setRoot(Home);
      }).catch((err) => {
      console.log(err);
    });
  };


}
