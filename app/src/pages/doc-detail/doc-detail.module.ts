import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DocDetail} from './doc-detail';
import {TagSelectorModule} from "../../components/tag-selector/tag-selector.module";

@NgModule({
  declarations: [
    DocDetail,
  ],
  imports: [
    IonicPageModule.forChild(DocDetail),
    TagSelectorModule,
  ],
  exports: [
    DocDetail
  ]
})
export class DocDetailModule {
}
