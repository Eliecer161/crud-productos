import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private navController:NavController
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [null, Validators.required],
      description: ['', [Validators.required]],
      image: ['demo', [Validators.required]],
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      const product: any = await this.http.get(`products/details/${this.route.snapshot.paramMap.get('id')}`).pipe(first()).toPromise();
      this.updateForm.controls.name.setValue(product.name);
      this.updateForm.controls.price.setValue(product.price);
      this.updateForm.controls.description.setValue(product.description);
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

  async update() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.http.post(`products/update/${this.route.snapshot.paramMap.get('id')}`, {
        name: this.updateForm.value.name,
        price: this.updateForm.value.price,
        description: this.updateForm.value.description,
        image: this.updateForm.value.image,
      }).pipe(first()).toPromise();
      await loading.dismiss();
      (await this.toastController.create({
        message: 'Editado correctamente',
        duration: 3000
      })).present();
      this.navController.navigateBack('/home',{queryParams:{reload: true}})
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
