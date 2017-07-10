import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Api, groupInterface} from "../../services/singleton/api";
import {Util} from "../../services/singleton/util";
import {Storage} from "@ionic/storage";
import {ContactsPage} from "../contacts-page/contacts-page";
import {KanbanPage} from "../kanban-page/kanban-page";
import {ForumPage} from "../forum-page/forum-page";
import {AlbumPage} from "../album-page/album-page";
import {DocsPage} from "../docs-page/docs-page";
import {Clipboard} from '@ionic-native/clipboard';

/**
 * Generated class for the GroupDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetail {

  public groupData: groupInterface;

  constructor(public navCtrl: NavController, private clipboard: Clipboard, public navParams: NavParams, private storage: Storage, public actionSheetCtrl: ActionSheetController, public util: Util, public api: Api) {
    this.groupData = this.navParams.data.groupData;
    this.loadData();
  }

  showAlbum() {
    this.navCtrl.push(AlbumPage, {
      groupData: this.navParams.data.groupData, reload: this.loadData.bind(this)
    });
  }

  showDocs() {
    this.navCtrl.push(DocsPage, {
      groupData: this.navParams.data.groupData, reload: this.loadData.bind(this)
    });
  }

  showContacts() {
    this.navCtrl.push(ContactsPage, {
      groupData: this.navParams.data.groupData, reload: this.loadData.bind(this)
    });
  }

  showKanban() {
    this.navCtrl.push(KanbanPage, {
      groupData: this.navParams.data.groupData, reload: this.loadData.bind(this)
    });
  }


  showForum() {
    this.navCtrl.push(ForumPage, {
      groupData: this.navParams.data.groupData, reload: this.loadData.bind(this)
    });
  }

  openActionSheet() {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: '复制圈子口令',
          handler: () => {
            this.clipboard.copy(this.groupData.password);
            this.util.showToast("复制成功，发送给好友即可邀请他们加入本圈子", 5000);
          }
        }, {
          text: '退出圈子',
          role: 'destructive',
          handler: () => {
            this.util.confirm("确定要退出本圈子吗？").then((res) => {
              if (res) {
                this.api.request('group.quit', {id: this.groupData.id}, {}).then(data => {
                  this.navParams.data.reload();
                  this.util.showToast("退出成功");
                  this.navCtrl.pop();
                })
              }
            })
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();

  }

  ionViewDidLoad() {
    this.groupData.badge_hidden = true;
    this.storage.set('group_last_update_viewed_id_' + this.groupData.id, this.groupData.group_update_id);
    switch (this.navParams.data.autoOpenSub) {
      case 'kanban':
        this.showKanban();
        break;
      case 'album':
        this.showAlbum();
        break;
      case 'forum':
        this.showForum();
        break;
    }
  }

  public stats: any;

  private loadData($event = null) {
    this.api.request("group.detail", {id: this.groupData.id}, {})
      .then((data: any) => {
        this.stats = data;
        if ($event) {
          $event.complete();
        }
      });
  }

}
