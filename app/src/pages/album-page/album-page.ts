import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlbumUploadPage} from "../album-upload-page/album-upload-page";
import {Api} from "../../services/singleton/api";
import {User} from "../../services/singleton/user";
import {DomSanitizer} from "@angular/platform-browser";

export interface AlbumPhoto {
  id: number;
  user_id: number;
  user: User;
  group_id: number;
  image_url: string;
  thumbnail_image_url: string;
  created_at: string;
}

@IonicPage()
@Component({
  selector: 'page-album-page',
  templateUrl: 'album-page.html',
})
export class AlbumPage {

  public list: Array<AlbumPhoto>;

  constructor(private sanitization: DomSanitizer, public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

  loadData($event = null) {
    this.api.request('album.ls', {group_id: this.navParams.data.groupData.id}, {}).then((list: any) => {
      list.forEach((item) => {
        item.sanitized = this.sanitization.bypassSecurityTrustStyle("url(" + item.thumbnail_image_url + ")")
      });
      this.list = list;
      if ($event) {
        $event.complete();
      }
    })
  }

  upload() {
    this.navCtrl.push(AlbumUploadPage, {
      groupData: this.navParams.data.groupData,
      reload: this.loadData.bind(this)
    });
  }

  showImage(url) {
    if (window['cordova'])
      window['PhotoViewer'].show(url);
  }
}
