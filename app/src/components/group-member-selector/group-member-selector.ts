import {Component, Input} from '@angular/core';
import {User} from "../../services/singleton/user";
import {NavController} from "ionic-angular";
import {GroupMemberSelectionPage} from "../../pages/group-member-selection-page/group-member-selection-page";

/**
 * Generated class for the GroupMemberSelector component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'group-member-selector',
  templateUrl: 'group-member-selector.html'
})
export class GroupMemberSelector {

  @Input() data: Array<User>;
  @Input() group_id: number;

  showSelectionPage() {
    this.navCtrl.push(
      GroupMemberSelectionPage,
      {
        group_id: this.group_id,
        data: this.data
      });
  }

  constructor(public navCtrl: NavController) {
    console.log("hello");
  }

}
