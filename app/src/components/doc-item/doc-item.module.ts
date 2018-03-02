import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DocItem} from './doc-item';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DocList} from "./doc-list";
import {RatingBarModule} from "../rating-bar/rating-bar.module";
import {DocDetailModule} from "../../pages/doc-detail/doc-detail.module";

@NgModule({
  declarations: [
    DocItem,
    DocList
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicPageModule.forChild(DocItem),
    RatingBarModule,
    DocDetailModule
  ],
  exports: [
    DocItem,
    DocList
  ]
})
export class DocItemModule {
}
