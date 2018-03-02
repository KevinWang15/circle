import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ContactsDetailPage} from "../contacts-detail-page/contacts-detail-page";
import ApiService, {UserInfoInterface} from "./api-service";

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

  public list: Array<UserInfoInterface>;

  loadData($event = null) {
    this.apiService.getGroupMembers(this.navParams.data.groupData.id).then((data: any) => {
      this.list = data;
      if ($event) {
        $event.complete();
      }
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService) {
    this.loadData();
  }

  showContactsDetail(item) {
    this.navCtrl.push(ContactsDetailPage, item);
  }

}
