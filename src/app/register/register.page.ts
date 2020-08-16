import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController,
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      await this.http.post('auth/register', {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        name: this.registerForm.value.name,
      }).pipe(first()).toPromise();
      await loading.dismiss();
      (await this.toastController.create({
        message: 'Registrado',
        color: 'success',
        duration: 3000
      })).present();
      this.navController.navigateRoot('/login');
    } catch (error) {
      await loading.dismiss();
      (await this.toastController.create({
        message: error.error.message,
        color: 'danger',
        duration: 3000
      })).present();
    }
  }

}
