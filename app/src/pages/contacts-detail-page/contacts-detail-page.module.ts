import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContactsDetailPage} from './contacts-detail-page';
import {Contact} from "@ionic-native/contacts";

@NgModule({
  declarations: [
    ContactsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsDetailPage),
  ],
  exports: [
    ContactsDetailPage
  ],
  providers: [
    Contact
  ]
})
export class ContactsDetailPageModule {
}
