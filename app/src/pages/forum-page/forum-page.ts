import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../services/singleton/user";
import {NewForumPostPage} from "../new-forum-post-page/new-forum-post-page";
import {Api} from "../../services/singleton/api";
import {noop} from "rxjs/util/noop";
import {ForumPostDetailPage} from "../forum-post-detail-page/forum-post-detail-page";

export interface ForumPostReply {
  id: number;
  forum_post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
}
export interface ForumPost {
  id: number;
  reply_count: number;
  group_id: number;
  owner_user_id: number;
  owner: User;
  title: string;
  content: string;
  mentioned_users: Array<User>;
  replies: Array<ForumPostReply>;
}

@IonicPage()
@Component({
  selector: 'page-forum-page',
  templateUrl: 'forum-page.html',
})
export class ForumPage {
  @ViewChild(Content) content;

  public list: Array<ForumPost> = [];
  public finished: boolean = false;
  public paginationStart = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.loadMoreData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPage');
  }


  newPost() {
    this.navCtrl.push(NewForumPostPage,
      {groupData: this.navParams.data.groupData, reload: this.refresh.bind(this)}
    );
  }


  refresh($event = null) {
    this.paginationStart = 0;
    this.list = [];
    this.finished = false;
    this.loadMoreData().then(() => {
      setTimeout(() => {
        this.content.scrollToTop();
      });
      if ($event) {
        $event.complete();
      }
    }).catch(noop);
  }

  onInfinite($event) {
    console.log("calling do infinite..", $event, this);
    this.loadMoreData(true).then(() => {
      $event.complete();
    }).catch(noop);
  }

  loadMoreData(suppressLoading = false) {
    let params = {
      start: this.paginationStart,
      group_id: this.navParams.data.groupData.id
    };
    return this.api.request('forum.ls', params, {showLoading: !suppressLoading})
      .then((data: any) => {
        data.forEach((item) => {
          this.list.push(item);
        });
        console.log(this.list);
        if (data.length < 10) {
          this.finished = true;
          console.log("finished");
        }
        this.paginationStart += data.length;
        return Promise.resolve();
      }).catch(() => {
        return Promise.resolve();
      }).then(() => {
        return Promise.resolve();
      });
  }

  showPostDetail(post: ForumPost) {
    this.navCtrl.push(ForumPostDetailPage, {
      groupData: this.navParams.data.groupData,
      post: post
    });
  }
}
