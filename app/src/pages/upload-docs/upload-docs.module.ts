import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDocsPage } from './upload-docs';

@NgModule({
  declarations: [
    UploadDocsPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadDocsPage),
  ],
  exports: [
    UploadDocsPage
  ]
})
export class UploadDocsPageModule {}
