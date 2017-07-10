import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the Article page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class Article {
  data: articleInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Article');
  }
}

interface articleInterface {
  title: string,
  content: string
}
