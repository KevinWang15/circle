import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {noop} from "rxjs/util/noop";
import {Api} from "../../services/singleton/api";
import {UploadDocsPage} from "../upload-docs/upload-docs";

/**
 * Generated class for the DocsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-docs-page',
  templateUrl: 'docs-page.html',
})
export class DocsPage {
  docItems = [];
  tagFilter = [];
  paginationStart = 0;
  isFinished = false;

  @ViewChild(Content) content: Content;

  fileTags = ['学习', '生活', '托福', 'SAT', 'GRE', '雅思'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, private app: App) {
    this.loadMoreData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocsPage');
  }

  loadMoreData(suppressLoading = false) {
    let params = {
      start: this.paginationStart,
      filter: this.tagFilter,
      group_id: this.navParams.data.groupData.id
    };
    return this.api.request('doc.ls', params, {showLoading: !suppressLoading}).then((data: any) => {
      data.list.forEach((item) => {
        this.docItems.push(item);
      });
      if (data.list.length < 10) {
        this.isFinished = true;
      }
      this.paginationStart += data.list.length;
      return Promise.resolve();
    }).catch(() => {
      return Promise.resolve();
    }).then(() => {
      return Promise.resolve();
    });
  }

  onTagChanged($event = null) {
    this.paginationStart = 0;
    this.docItems = [];
    this.isFinished = false;
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

  showUpload($event) {
    this.app.getRootNav().push(UploadDocsPage, {
      groupData: this.navParams.data.groupData,
      reload: this.onTagChanged.bind(this)
    });
  }

  uploadFile() {
    console.log("upload file");
  }
}
