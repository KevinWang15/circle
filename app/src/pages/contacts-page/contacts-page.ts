import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api} from "../../services/singleton/api";
import {ContactsDetailPage} from "../contacts-detail-page/contacts-detail-page";

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts-page',
  templateUrl: 'contacts-page.html',
})
export class ContactsPage {

  public list: Array<any>;

  loadData($event = null) {
    this.api.request("group.members", {id: this.navParams.data.groupData.id}, {}).then((data: any) => {
      this.list = data;
      if ($event) {
        $event.complete();
      }
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

  showContactsDetail(item) {
    this.navCtrl.push(ContactsDetailPage, item);
  }

}
