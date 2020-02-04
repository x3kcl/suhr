import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Dokumente',
      url: '/documents',
      icon: 'list'
    },
    {
      title: 'Fotos',
      url: '/fotos',
      icon: 'list'
    },
    {
      title: 'Für Euch gelesen',
      url: '/picked',
      icon: 'list'
    },
    {
      title: 'Statistiken',
      url: '/statistics',
      icon: 'list'
    },
    {
      title: 'Links',
      url: '/links',
      icon: 'list'
    },
    {
      title: 'Kontact',
      url: '/contact',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
