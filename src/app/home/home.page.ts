import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ActionSheetController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any;
  backend = environment.backend;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params.reload) {
        await this.ngOnInit();
      }
    });

  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      this.products = await this.http.get('products').pipe(first()).toPromise();
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

  async presentOptions(product: any) {
    const actionSheet = await this.actionSheetController.create({
      header: product.name,
      buttons: [{
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.navController.navigateForward(`update/${product._id}`)
        }
      }, {
        text: 'Subir/Editar Imagen',
        icon: 'cloud-upload',
        handler: () => {
          this.navController.navigateForward(`upload/${product._id}`)
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          try {
            await this.http.delete(`products/delete/${product._id}`).pipe(first()).toPromise();
            (await this.toastController.create({
              message: 'Eliminado correctamente',
              color: 'success',
              duration: 3000
            })).present();
            this.ngOnInit();
          } catch (error) {

          }
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
