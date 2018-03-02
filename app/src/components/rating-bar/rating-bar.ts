import {Component, Input} from '@angular/core';

/**
 * Generated class for the RatingBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rating-bar',
  templateUrl: 'rating-bar.html'
})
export class RatingBar {

  @Input() rating: number;

  constructor() {
  }

}
