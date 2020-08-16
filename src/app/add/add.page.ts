import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient,
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [null, Validators.required],
      description: ['', [Validators.required]],

    });
  }

  ngOnInit() {
  }

  async add() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.http.post('products/create', {
        name: this.addForm.value.name,
        price: this.addForm.value.price,
        description: this.addForm.value.description
      }).pipe(first()).toPromise();
      await loading.dismiss();
      (await this.toastController.create({
        message: 'Agregado correctamente',
        duration: 3000
      })).present();

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
