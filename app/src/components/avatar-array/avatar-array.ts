import {Component, Input} from '@angular/core';
import {User} from "../../services/singleton/user";

/**
 * Generated class for the AvatarArray component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'avatar-array',
  templateUrl: 'avatar-array.html'
})
export class AvatarArray {

  @Input() users: Array<User>;

  constructor() {
  }

}
