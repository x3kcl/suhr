import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  standalone: false,
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
      title: 'Mitglieder',
      url: '/members',
      icon: 'person-add-outline'
    }
  ];

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {});
  }
}
