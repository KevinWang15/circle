import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ForumPost} from "../forum-page/forum-page";
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";
import {ForumNewReplyPageModule} from "../forum-new-reply-page/forum-new-reply-page.module";
import {ForumNewReplyPage} from "../forum-new-reply-page/forum-new-reply-page";
import {User} from "../../services/singleton/user";

/**
 * Generated class for the ForumPostDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forum-post-detail-page',
  templateUrl: 'forum-post-detail-page.html',
})
export class ForumPostDetailPage {

  public post: ForumPost;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public user: User) {
    this.post = this.navParams.data.post;
    this.loadData();
  }

  public loadData($event = null) {
    this.api.request('forum.get', {id: this.post.id}, {}).then((data) => {
      Object.assign(this.post, data);
      console.log(this.post);
      if ($event) {
        $event.complete();
      }
    }).catch(noop);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPostDetailPage');
  }


  reply() {
    this.navCtrl.push(ForumNewReplyPage, {post: this.post, reload: this.loadData.bind(this)});
  }

}
