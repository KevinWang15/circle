import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Util} from "../../services/singleton/util";

/**
 * Generated class for the TagSelector component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tag-selector',
  templateUrl: 'tag-selector.html'
})
export class TagSelector {
  @Input() public availableTags;
  @Input() public selectedTags;
  @Input() public showClearBtn;
  @Input() public readOnly;
  @Output() public onTagChanged: EventEmitter<void> = new EventEmitter<void>();

  public toggleTag(tag) {
    if (this.readOnly)
      return;
    if (this.selectedTags.indexOf(tag) >= 0) {
      Util.removeFromArray(this.selectedTags, tag);
    } else {
      this.selectedTags.push(tag);
    }

    this.onTagChanged.emit();
  }

  constructor() {
  }

  public clear() {
    if (this.selectedTags.length == 0)
      return;
    this.selectedTags.splice(0);
    this.onTagChanged.emit();
  }
}
