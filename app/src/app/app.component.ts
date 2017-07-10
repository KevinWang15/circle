import {Component, enableProdMode, ViewChild} from '@angular/core';
import {App as _App, Nav, NavController, Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {User} from '../services/singleton/user';
import {env} from "../config/environment";
import {Util} from "../services/singleton/util";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {Storage} from "@ionic/storage"
import {Home} from "../pages/home/home";
import {Login} from "../pages/login/login";

if (window.location.host == 'society.panopath.com' || window.location.host == 'panopath.com:38997') {
  env.prod = true;
  env.server_url = 'https://panopath.com:38998/';
}

if (env.prod)
  enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class App {
  rootPage: any;
  @ViewChild(Nav) nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private user: User, private app: _App, private toastCtrl: ToastController) {

    // 尝试自动登入
    user.autoLogin().then(() => {
      this.nav.setRoot(Home);
    }, () => {
      this.nav.setRoot(Login);
    });
    this.rootPage = LoadingPage;
    // this.rootPage = Login;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    window['redirectToLogin'] = () => {
      app.getRootNav().setRoot(Login);
    }
  }
}
