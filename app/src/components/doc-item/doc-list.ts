import {Component, EventEmitter, Input, Output} from '@angular/core';
import {docInterface} from "./doc-item";
import {Api} from "../../services/singleton/api";
import {InfiniteScroll} from "ionic-angular";

@Component({
  selector: 'doc-list',
  templateUrl: 'doc-list.html'
})
export class DocList {
  @Input() public items: Array<docInterface>;
  @Input() public finished: boolean = false;
  @Output() onInfinite: EventEmitter<InfiniteScroll> = new EventEmitter<InfiniteScroll>();

  public doInfinite(infiniteScroll: InfiniteScroll) {
    console.log("doing infinite", this.onInfinite);
    this.onInfinite.emit(infiniteScroll);
  };

  constructor(api: Api) {
  }
}
