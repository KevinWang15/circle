import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../services/singleton/api";
import {docInterface} from "../../components/doc-item/doc-item";
import {Util} from "../../services/singleton/util";
import {noop} from "rxjs/util/noop";
import {User} from "../../services/singleton/user";
import {InAppBrowser} from '@ionic-native/in-app-browser';

/**
 * Generated class for the DocDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doc-detail',
  templateUrl: 'doc-detail.html',
})
export class DocDetail {
  public data: docInterface;
  public loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util, public user: User, private iab: InAppBrowser) {
    this.loadData();
  }

  loadData() {
    let docId = this.navParams.data.id;
    this.api.request('doc.detail', {id: docId}, {}).then((data: docInterface) => {
      console.log(data);
      this.loading = false;
      try {
        data.tags = JSON.parse(data.tags_json);
      } catch (ex) {
        data.tags = [];
      }
      console.log(data.tags);
      this.data = data;
    });
  }

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }

  download() {
    window.open(this.data.link + "?attname=" + this.data.name, "_system");
  }

}
