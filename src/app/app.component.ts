import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Agregar producto',
      url: '/add',
      icon: 'add'
    }
  ];

  constructor(
    private afAuth: AngularFireAuth,
    private menuController: MenuController,
    private navController: NavController
  ) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.menuController.enable(true);
      } else {
        this.menuController.enable(false);
      }
    });
  }

  async logout() {
    await this.afAuth.signOut();
    this.navController.navigateRoot('/login');
  }
}
