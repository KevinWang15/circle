import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as dateFns from 'date-fns';
import {Api} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
/**
 * Generated class for the NewForumPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-forum-post-page',
  templateUrl: 'new-forum-post-page.html',
})
export class NewForumPostPage {

  public group: any;
  public formData = {
    title: "",
    content: "",
    mentioned: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public util: Util) {
    this.group = navParams.data.groupData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewForumPostPage');
  }

  save() {
    if (!this.formData.content) {
      this.util.showToast("帖子内容不能为空！");
      return;
    }
    this.api.request('forum.create',
      {
        group_id: this.navParams.data.groupData.id,
        title: this.formData.title,
        content: this.formData.content,
        mentioned: this.formData.mentioned,
      },
      {}).then((data) => {
      this.util.showToast("发表成功");
      this.navCtrl.pop();
      this.navParams.data.reload();
    });
  }

}
