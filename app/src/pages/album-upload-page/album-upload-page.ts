import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {noop} from "rxjs/util/noop";
import {MultiImageUpload} from "../../components/multi-image-upload/multi-image-upload";
import {Util} from "../../services/singleton/util";
import {Api} from "../../services/singleton/api";

/**
 * Generated class for the AlbumUploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-album-upload-page',
  templateUrl: 'album-upload-page.html',
})
export class AlbumUploadPage {
  @ViewChild(MultiImageUpload) imageArray: MultiImageUpload;

  private submit() {
    if (this.imageArray.images.length == 0) {
      this.util.showToast("请上传至少一张照片");
      return;
    }
    this.imageArray.uploadImages().then((images) => {
      images = images.map((item) => {
        return 'http://psfiles.panopath.com/' + item.key;
      });
      console.log(images);
      this.api.request('album.create',
        {
          group_id: this.navParams.data.groupData.id,
          image_urls: images
        }, {}).then(() => {
        this.navCtrl.pop();
        this.navParams.data.reload();
        this.util.showToast('上传成功');
      });
    });
  }

  private abort() {
    this.util.confirm('确定要取消上传吗', '确定吗').then(value => {
      if (value) {
        this.imageArray.abort();
      }
    })
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public util: Util, private api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumUploadPage');
  }

}
