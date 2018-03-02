import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ForumPost} from "../forum-page/forum-page";
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";

/**
 * Generated class for the ForumNewReplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forum-new-reply-page',
  templateUrl: 'forum-new-reply-page.html',
})
export class ForumNewReplyPage {

  public post: ForumPost;
  public formData = {content: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    this.post = navParams.data.post;
  }

  reply() {
    console.log(this.formData);
    this.api.request("forum.reply", {
      id: this.post.id,
      content: this.formData.content
    }, {}).then(() => {
      this.util.showToast("发布成功");
      this.navCtrl.pop();
      this.navParams.data.reload();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumNewReplyPage');
  }

}
