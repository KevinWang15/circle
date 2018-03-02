import {IonicErrorHandler} from 'ionic-angular';
import {env} from "../config/environment";

export class CustomErrorHandler extends IonicErrorHandler {

  constructor() {
    super();
  };

  handleError(err: any) {
    super.handleError(err);
    // if (env.prod) {
    //   // don't throw exception in production environment
    // } else {
    //   super.handleError(err);
    // }
  };
}
