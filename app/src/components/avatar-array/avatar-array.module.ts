import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarArray } from './avatar-array';

@NgModule({
  declarations: [
    AvatarArray,
  ],
  imports: [
    IonicPageModule.forChild(AvatarArray),
  ],
  exports: [
    AvatarArray
  ]
})
export class AvatarArrayModule {}
