import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Api} from "./api";
import {Util} from "./util";
import {noop} from "rxjs/util/noop";
import {App} from "ionic-angular";
import {Login} from "../../pages/login/login";

@Injectable()
export class User {
  constructor(private storage: Storage, private api: Api, private util: Util, private app: App) {
    if (window['UserService'])
      throw "User service must be a singleton !";
    window['UserService'] = this;
  }

  public id: number = 0;
  public avatar_url: string;
  public name: string;
  public email: string;
  public mobile: string;
  public token: string = "";

  private userInfoGotResolve: Function;
  public userInfoGot: any = new Promise((resolve, reject) => {
    this.userInfoGotResolve = resolve;
  });

  public getUserInfo() {
    return this.api.getUserInfo().then(data => {
      if (this.userInfoGotResolve) {
        this.userInfoGotResolve();
        this.userInfoGotResolve = null;
      }
      this.email = data.email;
      this.name = data.name;
      this.mobile = data.mobile;
      this.id = data.id;
      this.avatar_url = data.avatar_url;
      return data;
    }).catch(reason => {
      return Promise.reject(reason);
    });
  }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

  public autoLogin(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.storage.get("jwt_token").then((jwtToken) => {
        if (!jwtToken) {
          reject();
        } else {
          this.token = jwtToken;
          this.getUserInfo();
          resolve();
        }
      });
    });
  }

  public login(email: string, password: string) {
    return this.api.login(email, password).then(
      (data) => {
        this.token = data.token;
        this.storage.set("jwt_token", data.token);
        this.storage.set("email", email);
        this.util.showToast('登入成功');
        this.getUserInfo();
      }, (err) => {
        if (err['error'] == 'invalid_credentials') {
          this.util.showToast('用户名或密码错误');
        }
        return Promise.reject(err);
      });
  }

  public logout() {
    this.token = null;
    this.storage.remove("jwt_token");
  }
}
