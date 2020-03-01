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
      icon: 'information-circle-outline'
    },
    {
      title: 'Dokumente',
      url: '/item/documents/document/documents',
      icon: 'book'
    },
    {
      title: 'Fotos',
      url: '/item/fotos/foto/fotos',
      icon: 'images'
    },
    {
      title: 'Presse',
      url: '/item/articles/article/articles',
      icon: 'repeat'
    },
    {
      title: 'Statistiken',
      url: '/item/statistics/statistic/statistics',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Links',
      url: '/links',
      icon: 'link'
    },
    {
      title: 'Kontakt',
      url: '/contact',
      icon: 'mail-outline'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'mail-outline'
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
