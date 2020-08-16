import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

import b64toBlob from 'b64-to-blob';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  image: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController:NavController
  ) { }

  ngOnInit() {
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.image = image.base64String;
  }

  async upload() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      const blob = b64toBlob(this.image, 'image/jpeg');
      const formData: FormData = new FormData();
      formData.append('image', blob);
      await this.http.post(`products/upload/${this.route.snapshot.paramMap.get('id')}`, formData).pipe(first()).toPromise();
      (await this.toastController.create({
        message: 'Subida correctamente',
        duration: 3000
      })).present();
      this.navController.navigateBack('/home',{queryParams:{reload: true}});
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      (await this.toastController.create({
        message: error,
        color: 'danger',
        duration: 3000
      })).present();
    }
  }

}
