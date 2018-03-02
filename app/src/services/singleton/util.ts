import {Injectable} from "@angular/core";
import {ToastController, AlertController} from "ionic-angular";
@Injectable()
export class Util {
  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  public showToast(text: string, duration = 1500) {
    this.toastCtrl.create({
      message: text,
      duration: duration,
      position: 'bottom'
    }).present();
  }

  public static subscribers: Array<Function> = [];

  public static sub(callback: Function) {
    Util.subscribers.push(callback);
  }

  public static pub(message: Object) {
    Util.subscribers.forEach((subscriber: Function) => {
      subscriber(message);
    });
  }


  public confirm(text, title = '请确认', yes = "是", no = "否") {
    return new Promise(
      (resolve, reject) => {
        this.alertCtrl.create({
          title: title,
          message: text,
          buttons: [
            {
              text: no,
              role: 'cancel',
              handler: () => {
                resolve(false);
              }
            },
            {
              text: yes,
              handler: () => {
                resolve(true);
              }
            }
          ]
        }).present();
      }
    );
  }

  public static removeFromArray<T>(array: Array<T>, item: T) {
    let index: number = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  public validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
