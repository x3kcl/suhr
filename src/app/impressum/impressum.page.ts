import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.page.html',
  styleUrls: ['./impressum.page.scss'],
})
export class ImpressumPage implements OnInit {
  Card: any = [];
  title: string;

  constructor(
    public restApi: CardService,
    private menu: MenuController,
  ) {
    this.title = 'Über uns';
  }

  ngOnInit() {
    this.loadImpressum();
  }

  loadImpressum() {
    return this.restApi.getImpressum().subscribe((data) => {
      console.log(data.data[0]);
      this.Card = data.data;
    });
  }

  doRefresh(event) {
    this.loadImpressum();
    event.target.complete();
  }

}
