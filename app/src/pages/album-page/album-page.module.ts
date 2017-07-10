import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumPage } from './album-page';

@NgModule({
  declarations: [
    AlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumPage),
  ],
  exports: [
    AlbumPage
  ]
})
export class AlbumPageModule {}
