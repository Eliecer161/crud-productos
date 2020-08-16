import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController,
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    try {
      const result: any = await this.http.post('auth/login', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).pipe(first()).toPromise();
      await this.afAuth.signInWithCustomToken(result.token);
      await loading.dismiss();
      this.navController.navigateRoot('/home');
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
