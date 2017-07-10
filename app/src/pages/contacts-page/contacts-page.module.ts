import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContactsPage} from './contacts-page';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsPage),
    CommonModule
  ],
  exports: [
    ContactsPage
  ]
})
export class ContactsPageModule {
}
