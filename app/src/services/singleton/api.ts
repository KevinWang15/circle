/**
 * 只处理数据（转类型）、判断是否可以调用API（如 requiresLogin）、在invalid_token时给User Service发送消息
 * 禁止做其他的事情（如保存用户token等）
 *
 * 返回值必须是 Promise<xxxResponse>
 *
 * 所有调用api.xxx()的，都要记得.catch();
 */

import {Injectable} from '@angular/core';
import {env} from '../../config/environment';
import {Http, Headers, Response, RequestOptionsArgs, RequestMethod} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';
import {Util} from "./util";
import {LoadingController, ToastController, AlertController} from "ionic-angular";

function RequiresLogin(target, key, descriptor) {
  if (descriptor === undefined)
    descriptor = Object.getOwnPropertyDescriptor(target, key);

  let originalMethod = descriptor.value;

  descriptor.value = function () {
    if (!(window['UserService'] && window['UserService'].isLoggedIn())) {
      window['redirectToLogin']();
      return Promise.reject({"error": "requires_login"});
    } else {
      return originalMethod.apply(this, arguments);
    }
  };
  return descriptor;
}

let resultCache = {};
function CachesResult(target, key, descriptor) {
  if (descriptor === undefined)
    descriptor = Object.getOwnPropertyDescriptor(target, key);

  let originalMethod = descriptor.value;

  descriptor.value = ((key, resultCache) => {
    return function () {
      if (resultCache[key]) {
        // console.log("from cache", key);
        return Promise.resolve(resultCache[key]);
      } else {
        let originalResult: Promise<any> = originalMethod.apply(this, arguments);
        originalResult.then(value => {
          resultCache[key] = value;
        });
        return originalResult;
      }
    };
  })(key, resultCache);


  return descriptor;
}

@Injectable()
export class Api {
  constructor(private http: Http, private util: Util, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.http = http;
  }

  request(path: string, params, {showLoading = true, muteErrorToast = false}) {
    let loading;
    if (showLoading) {
      loading = this.loadingCtrl.create({
        content: '载入中，请稍等'
      });
      loading.present();
    }
    path = path.replace(/\./g, '/');
    let headers = new Headers();
    if (window['UserService'] && window['UserService'].isLoggedIn()) {
      headers.append('Authorization', 'Bearer ' + window['UserService'].token);
    }

    return new Promise((resolve, reject) => {
      let completed = false;
      let isPromiseFulfilled = false;
      let alertShown = false;
      let alert = null;
      setInterval(() => {
        if (!completed && !alertShown) {
          alertShown = true;
          alert = this.alertCtrl.create({
            title: '网络慢',
            message: '您希望如何操作?',
            buttons: [
              {
                text: '放弃',
                handler: () => {
                  alertShown = false;
                  if (!completed && !isPromiseFulfilled) {
                    if (showLoading) loading.dismiss();
                    completed = true;
                    isPromiseFulfilled = true;
                    reject({});
                  }
                }
              },
              {
                text: '重试',
                handler: () => {
                  alertShown = false;

                  if (!completed) {
                    if (showLoading) loading.dismiss();
                    completed = true;
                    this.request(path, params, {showLoading}).then(
                      value => {
                        if (!isPromiseFulfilled) {
                          isPromiseFulfilled = true;
                          resolve(value);
                        }
                      }, reason => {
                        if (!isPromiseFulfilled) {
                          isPromiseFulfilled = true;
                          reject(reason);
                        }
                      }
                    );
                  }
                }
              },
              {
                text: '等待',
                handler: () => {
                  alertShown = false;

                }
              }
            ]
          });
          alert.present();
        }
      }, 5000);

      let doFinally = function () {
        completed = true;
        if (showLoading)
          loading.dismiss();
        if (alertShown) {
          alert.dismiss();
        }
      };
      this.http.post(env.server_url + path, params, {headers})
        .subscribe(
          (res: Response) => {
            let body = res.json();
            if (!isPromiseFulfilled) {
              isPromiseFulfilled = true;
              resolve(body || {});
            }
            doFinally();
          },
          (error: Response | any) => {
            let reason = error.json() || {};
            if (reason.error == 'invalid_token') {
              window['redirectToLogin']();
            } else if (reason.error == 'invalid_data') {
              if (!muteErrorToast)
                this.toastCtrl.create({
                  message: "输入无效：" + reason.message,
                  duration: 1500,
                }).present();
            } else if (error.status == 0) {
              if (!muteErrorToast)
                this.toastCtrl.create({
                  message: "无法连接到服务器，请检查网络后再试。",
                  showCloseButton: true,
                  closeButtonText: "关闭",
                  position: 'middle',
                  cssClass: 'important-toast'
                }).present();
            } else {
              if (!muteErrorToast)
                this.toastCtrl.create({
                  message: "出错了: " + (reason.error || reason.message),
                  duration: 1500,
                }).present();
            }
            if (!isPromiseFulfilled) {
              isPromiseFulfilled = true;
              reject(reason);
            }
            doFinally();
          });
    });
  }

  login(email: string, password: string): Promise<loginResponse> {
    return this.request("user.login", {email, password}, {muteErrorToast: true});

  }

  @RequiresLogin
  getUserInfo(): Promise<any> {
    return this.request("user.info", {}, {muteErrorToast: true});
  }

  @RequiresLogin
  getImageUploadToken(): Promise<getImageUploadTokenResponse> {
    return this.request("misc.upload-token", {}, {showLoading: false});
  }

  @RequiresLogin
  myGroups(): Promise<Array<any>> {
    return this.request("user.my-groups", {}, {});
  }
}


export interface loginResponse {
  token: string;
}

export interface queryWorkerResponse {
  id: number;
  pass_no: string;
  name: string;
  avatar_url: string;
  company: string;
  valid_until: string;
  id_card_no: string;
  misc: string;
}

export interface getImageUploadTokenResponse {
  token: string;
}

export interface getLocationsResponse extends Array<LocationData> {
}

export interface LocationData {
  id: number;
  lat: number;
  lng: number;
  name: number;
}

export interface getMonthlyHistoryResponse extends Array<ReportData> {

}

export interface ReportData {
  id: number;
  user_id: number;
  location_id: number;
  images: Array<string>;
  problems: Array<string>;
  details: string;
  created_at: string;
  updated_at: string;
}

export interface quizResultResponse {

}

export interface groupInterface {
  description: string;
  id: number;
  name: string;
  image_url: string;
  password: string;
  member_count: number;
  group_update_id: number;
  group_update_text: string;
  badge_hidden: boolean;
}

export {RequiresLogin};
