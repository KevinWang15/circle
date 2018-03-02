import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
/**
 * Generated class for the UploadDocsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload-docs',
  templateUrl: 'upload-docs.html',
})
export class UploadDocsPage {
  public formData = {
    file_url: "",
    name: "",
    tags: [""],
    size_kb: 0,
    type: "",
    group_id: this.navParams.data.groupData.id,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Util, private api: Api, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadDocsPage');
  }

  checkUpdateInterval;

  tryClearCheckUpdateInterval() {
    if (this.checkUpdateInterval) {
      clearInterval(this.checkUpdateInterval);
      this.checkUpdateInterval = 0;
    }
  }

  newTag() {
    this.formData.tags.push("");
  }

  scanQr() {

    this.barcodeScanner.scan().then((token) => {
      this.api.request("qr.set-action", {
        token: token,
        action: JSON.stringify({
          type: "upload"
        })
      }, {}).then(() => {
        this.util.showToast("扫码成功，请至电脑上传");
        this.tryClearCheckUpdateInterval();
        this.checkUpdateInterval = setInterval(() => {
          this.api.request("qr.get-response", {
            token: token
          }, {showLoading: false}).then((data) => {
            if (data['response']) {
              let response = JSON.parse(data['response']);
              this.formData.file_url = response.url;
              this.formData.size_kb = Math.floor(response.size / 1024);
              this.formData.name = response.name;
              this.formData.type = response.type;
              this.tryClearCheckUpdateInterval();
            }
          });
        }, 2000);
      }).catch(err => {
        this.util.showToast(JSON.stringify(err));
      });
    });
  }

  save() {
    this.api.request("doc.create", this.formData, {}).then(() => {
      this.util.showToast("资料上传成功");
      this.navCtrl.pop();
      this.navParams.data.reload();
    }).catch(err => {
      this.util.showToast(JSON.stringify(err));
    });
  }

}
