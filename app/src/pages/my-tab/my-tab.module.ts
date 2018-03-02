import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyTab} from './my-tab';

@NgModule({
  declarations: [
    MyTab,
  ],
  imports: [
    IonicPageModule.forChild(MyTab),
  ],
  exports: [
    MyTab
  ]
})
export class MyTabModule {
}
