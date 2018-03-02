import {Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActionSheetController, AlertController, Platform, ToastController} from "ionic-angular";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {TransferObject} from "@ionic-native/transfer";
import {Api} from "../../services/singleton/api";

@Component({
  selector: 'multi-image-upload',
  templateUrl: 'multi-image-upload.html',
  providers: [Camera, File, FilePath, Platform]
})

export class MultiImageUpload {

  public isUploading = false;
  public uploadingProgress = {};
  public uploadingHandler = {};
  public images: any = [];
  protected imagesValue: Array<any>;

  constructor(private sanitization: DomSanitizer, private actionSheetCtrl: ActionSheetController, private camera: Camera, private file: File, private alertCtrl: AlertController, private toastCtrl: ToastController, private api: Api) {
  }

  public uploadImages(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.isUploading = true;
      Promise.all(this.images.map(image => {
        return this.uploadImage(image);
      }))
        .then(resolve)
        .catch(reason => {
          this.isUploading = false;
          this.uploadingProgress = {};
          this.uploadingHandler = {};
          reject(reason);
        });

    });
  }

  public abort() {
    if (!this.isUploading)
      return;
    this.isUploading = false;
    for (let key in this.uploadingHandler) {
      this.uploadingHandler[key].abort();
    }
  }

  // ======================================================================

  protected removeImage(image) {
    if (this.isUploading)
      return;
    this.util.confirm("确定要移除吗?").then(value => {
      if (value) {
        this.util.removeFromArray(this.imagesValue, image);
        this.util.removeFromArray(this.images, image.url);
      }
    });
  }

  protected showAddImage() {
    if (!window['cordova']) {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = "image/x-png,image/gif,image/jpeg";
      input.click();
      input.onchange = () => {
        let blob = window.URL.createObjectURL(input.files[0]);
        this.images.push(blob);
        this.util.trustImages();
      }
    } else {
      new Promise((resolve, reject) => {
        let actionSheet = this.actionSheetCtrl.create({
          title: '添加一张照片',
          buttons: [
            {
              text: '从相册',
              handler: () => {
                resolve(this.camera.PictureSourceType.PHOTOLIBRARY);
              }
            },
            {
              text: '从相机',
              handler: () => {
                resolve(this.camera.PictureSourceType.CAMERA);
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                reject();
              }
            }
          ]
        });
        actionSheet.present();
      }).then(sourceType => {
        if (!window['cordova'])
          return;
        let options: CameraOptions = {
          quality: 100,
          sourceType: sourceType as number,
          saveToPhotoAlbum: false,
          correctOrientation: true
        };
        this.camera.getPicture(options).then((imagePath) => {
          this.images.push(imagePath);
          this.util.trustImages();
        });
      }).catch(() => {
      });
    }
  }


  private uploadImage(targetPath) {

    return new Promise((resolve, reject) => {
      let askRetry = () => {
        // might have been aborted
        if (!this.isUploading) return reject(null);
        this.util.confirm('是否重试？', '上传失败').then(res => {
          if (!res) {
            this.isUploading = false;
            for (let key in this.uploadingHandler) {
              this.uploadingHandler[key].abort();
            }
            return reject(null);
          }
          else {
            if (!this.isUploading) return reject(null);
            this.uploadImage(targetPath).then(resolve, reject);
          }
        });
      };
      this.uploadingProgress[targetPath] = 0;
      let url = "http://upload.qiniu.com/";
      this.api.getImageUploadToken().then(
        (data) => {
          let extension = targetPath.substring(targetPath.lastIndexOf('.') + 1, targetPath.lastIndexOf('?'));
          let filename = (+new Date()) + Math.floor(Math.random() * 100) + "." + extension;

          let options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {'token': data.token, 'key': filename}
          };

          if (window['cordova']) {
            const fileTransfer = new TransferObject();
            this.uploadingHandler[targetPath] = fileTransfer;

            fileTransfer.upload(targetPath, url, options).then(data => {
              resolve(JSON.parse(data.response));
            }).catch(() => {
              askRetry();
            });

            fileTransfer.onProgress(event2 => {
              this.uploadingProgress[targetPath] = event2.loaded * 100 / event2.total;
            });
          } else {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', targetPath, true);
            xhr.responseType = 'blob';
            xhr.onload = (e) => {
              if (xhr['status'] != 200) {
                this.util.showToast("无法获得blob信息，可能是浏览器不支持");
                console.error(e, xhr);
                askRetry();
              } else {
                const blob = xhr['response'];
                let formData: FormData = new FormData(),
                  xhr2: XMLHttpRequest = new XMLHttpRequest();

                formData.append('token', data.token);
                formData.append('key', filename);
                formData.append('file', blob);
                this.uploadingHandler[targetPath] = xhr2;

                xhr2.onreadystatechange = () => {
                  if (xhr2.readyState === 4) {
                    if (xhr2.status === 200) {
                      resolve(JSON.parse(xhr2.response));
                    } else {
                      askRetry();
                    }
                  }
                };

                xhr2.upload.onprogress = (event) => {
                  this.uploadingProgress[targetPath] = event.loaded * 100 / event.total;
                };

                xhr2.open('POST', url, true);
                xhr2.send(formData);
              }
            };
            xhr.send();
          }
        }
      ).catch(() => {
        this.util.showToast("无法获得图片上传凭证");
        askRetry();
      });
    });
  }

  private util = ((_this: any) => {
    return {
      removeFromArray<T>(array: Array<T>, item: T) {
        let index: number = array.indexOf(item);
        if (index !== -1) {
          array.splice(index, 1);
        }
      },
      confirm(text, title = '', yes = "是", no = "否") {
        return new Promise(
          (resolve) => {
            _this.alertCtrl.create({
              title: title,
              message: text,
              buttons: [
                {
                  text: no,
                  role: 'cancel',
                  handler: () => {
                    resolve(false);
                  }
                },
                {
                  text: yes,
                  handler: () => {
                    resolve(true);
                  }
                }
              ]
            }).present();
          }
        );
      },
      trustImages() {
        _this.imagesValue = _this.images.map(
          val => {
            return {
              url: val,
              sanitized: _this.sanitization.bypassSecurityTrustStyle("url(" + val + ")")
            }
          }
        );
      },
      showToast(text: string) {
        _this.toastCtrl.create({
          message: text,
          duration: 5000,
          position: 'bottom'
        }).present();
      }
    }
  })(this);
}
