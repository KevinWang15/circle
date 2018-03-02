import {Component, Input} from '@angular/core';
import {groupInterface} from "../../services/singleton/api";
@Component({
  selector: 'group-item',
  templateUrl: 'group-item.html'
})
export class GroupItem {

  @Input() public data: groupInterface;

  constructor() {
  }

}
