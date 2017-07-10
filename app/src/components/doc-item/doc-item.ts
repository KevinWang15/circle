import {Component, Input} from '@angular/core';
import {App} from "ionic-angular";
import {DocDetail} from "../../pages/doc-detail/doc-detail";

/**
 * Generated class for the DocItem component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'doc-item',
  templateUrl: 'doc-item.html'
})
export class DocItem {

  @Input() public data: docInterface;

  constructor(private app: App) {
  }

  showDetail() {
    this.app.getRootNav().push(DocDetail, this.data);
  }
}

export interface docInterface {
  // 'name', 'id', 'image_url', 'price', 'size_kb', 'created_at', 'rating'
  name: string;
  doc_name: string;
  id: number;
  image_url: string;
  price: number;
  size_kb: number;
  created_at: string;
  rating: string;
  description: string;
  category_id: number;
  tags_json: string;
  tags: Array<string>;
  owns: boolean;
  link: string;
}
