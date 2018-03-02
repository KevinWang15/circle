import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadingPage } from './loading-page';

@NgModule({
  declarations: [
    LoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadingPage),
  ],
  exports: [
    LoadingPage
  ]
})
export class LoadingPageModule {}
