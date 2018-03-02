import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AlbumUploadPage} from './album-upload-page';
import {MultiImageUploadModule} from "../../components/multi-image-upload/multi-image-upload.module";

@NgModule({
  declarations: [
    AlbumUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumUploadPage),
    MultiImageUploadModule
  ],
  exports: [
    AlbumUploadPage
  ]
})
export class AlbumUploadPageModule {
}
