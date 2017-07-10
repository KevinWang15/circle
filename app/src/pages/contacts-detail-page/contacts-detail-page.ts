import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Contacts, ContactName, ContactField} from "@ionic-native/contacts";
import {Util} from "../../services/singleton/util";

/**
 * Generated class for the ContactsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts-detail-page',
  templateUrl: 'contacts-detail-page.html',
})
export class ContactsDetailPage {

  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, private util: Util) {
    this.data = navParams.data;
  }

  save() {
    let contact = this.contacts.create();

    contact.name = new ContactName(this.data.name);
    contact.phoneNumbers = [new ContactField('mobile', this.data.mobile)];
    contact.emails = [new ContactField('email', this.data.email)];
    contact.photos = [new ContactField('photo', this.data.avatar_url)];
    contact.save().then(
      () => this.util.showToast('保存成功！'),
      (error: any) => this.util.showToast('保存时出错：' + error)
    );
  }
}
