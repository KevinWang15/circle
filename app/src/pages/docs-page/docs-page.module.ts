import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DocsPage} from './docs-page';
import {TagSelectorModule} from "../../components/tag-selector/tag-selector.module";
import {DocItemModule} from "../../components/doc-item/doc-item.module";

@NgModule({
  declarations: [
    DocsPage,
  ],
  imports: [
    IonicPageModule.forChild(DocsPage),
    TagSelectorModule,
    DocItemModule

  ],
  exports: [
    DocsPage
  ]
})
export class DocsPageModule {
}
