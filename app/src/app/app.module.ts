import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule} from 'ionic-angular';
import {App} from './app.component';
import {Config} from '../config/config';
import {User} from '../services/singleton/user';
import {IonicStorageModule} from '@ionic/storage';
import {Home} from '../pages/home/home';
// import {Login} from '../pages/login/login';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Api} from "../services/singleton/api";
import {HttpModule} from '@angular/http';
import {Util} from "../services/singleton/util";
import {CustomErrorHandler} from "./error-handler";
import {env} from "../config/environment";
import {LoadingPageModule} from "../pages/loading-page/loading-page.module";
import {LoadingPage} from "../pages/loading-page/loading-page";
import {ArticleModule} from "../pages/article/article.module";
import {LoginModule} from "../pages/login/login.module";
import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {RegisterModule} from "../pages/register/register.module";
import {MyTabModule} from "../pages/my-tab/my-tab.module";
import {GroupTabModule} from "../pages/group-tab/group-tab.module";
import {MessageTabModule} from "../pages/message-tab/message-tab.module";
import {GroupDetailModule} from "../pages/group-detail/group-detail.module";
import {ContactsPage} from "../pages/contacts-page/contacts-page";
import {ContactsPageModule} from "../pages/contacts-page/contacts-page.module";
import {ContactsDetailPageModule} from "../pages/contacts-detail-page/contacts-detail-page.module";
import {KanbanDetailPage} from "../pages/kanban-detail-page/kanban-detail-page";
import {KanbanDetailPageModule} from "../pages/kanban-detail-page/kanban-detail-page.module";
import {KanbanPageModule} from "../pages/kanban-page/kanban-page.module";
import {ForumPageModule} from "../pages/forum-page/forum-page.module";
import {NewForumPostPage} from "../pages/new-forum-post-page/new-forum-post-page";
import {NewForumPostPageModule} from "../pages/new-forum-post-page/new-forum-post-page.module";

import "../lib/froala/froala_editor.pkgd.min.js";
import {FroalaEditorModule} from '../lib/angular2-froala-wysiwyg';
import {ForumPostDetailPageModule} from "../pages/forum-post-detail-page/forum-post-detail-page.module";
import {ForumNewReplyPageModule} from "../pages/forum-new-reply-page/forum-new-reply-page.module";
import {AlbumPageModule} from "../pages/album-page/album-page.module";
import {AlbumUploadPageModule} from "../pages/album-upload-page/album-upload-page.module";
import {MultiImageUploadModule} from "../components/multi-image-upload/multi-image-upload.module";
import {DocsPageModule} from "../pages/docs-page/docs-page.module";
import {TagSelectorModule} from "../components/tag-selector/tag-selector.module";
import {DocDetailModule} from "../pages/doc-detail/doc-detail.module";
import {DocItemModule} from "../components/doc-item/doc-item.module";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Transfer} from "@ionic-native/transfer";
import {NewGroupPageModule} from "../pages/new-group-page/new-group-page.module";
import {AddGroupPageModule} from "../pages/add-group-page/add-group-page.module";
import {Clipboard} from "@ionic-native/clipboard";
import {Contact, Contacts} from "@ionic-native/contacts";
import {EditProfilePageModule} from "../pages/edit-profile-page/edit-profile-page.module";
import {UploadDocsPageModule} from "../pages/upload-docs/upload-docs.module";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

window["env"] = env;

@NgModule({
  declarations: [
    App,
    Home,
  ],
  imports: [
    FroalaEditorModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(App, {
      mode: "ios", backButtonText: '后退',
    }),
    IonicStorageModule.forRoot({
      name: 'app',
      driverOrder: env.prod ? ['indexeddb', 'sqlite', 'websql'] : ['localstorage']
    }),
    HttpModule,
    LoadingPageModule,
    ArticleModule,
    LoginModule,
    RegisterModule,
    GroupDetailModule,
    MyTabModule,
    MessageTabModule,
    GroupTabModule,
    ContactsPageModule,
    ContactsDetailPageModule,
    KanbanDetailPageModule,
    KanbanPageModule,
    ForumPageModule,
    NewForumPostPageModule,
    ForumPostDetailPageModule,
    ForumNewReplyPageModule,
    AlbumPageModule,
    AlbumUploadPageModule,
    MultiImageUploadModule,
    DocsPageModule,
    TagSelectorModule,
    DocDetailModule,
    DocItemModule,
    NewGroupPageModule,
    AddGroupPageModule,
    EditProfilePageModule,
    UploadDocsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    Home,
    LoadingPage,
    Login,
    Register

  ],
  providers: [
    Util,
    StatusBar,
    SplashScreen,
    Config,
    User,
    Api,
    InAppBrowser,
    Camera,
    File,
    FilePath,
    PhotoViewer,
    Transfer,
    Clipboard,
    Contact,
    Contacts,
    BarcodeScanner,
    {provide: LOCALE_ID, useValue: "zh-CN"},
    {provide: ErrorHandler, useClass: CustomErrorHandler}
  ]
})
export class AppModule {
}
