import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { MenuController } from '@ionic/angular';
import { Card } from '../classes/card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Card: any = [];

  constructor(
    public restApi: CardService,
    private menu: MenuController,
  ) {}

  ngOnInit() {
    this.loadCards();
    this.openMenu();
  }

  // Get employees list
  loadCards() {
    return this.restApi.getCards().subscribe((data) => {
      //let items = data.data[0];
      //console.log(items);
      this.Card = data.data;

      //this.card = this.Card[0];
      //this.card = data.data[0];
      // console.log(this.Card);
      //console.log(this.card);
      //Test
    });
  }

  openMenu() {
    this.menu.enable(true, 'main-content');
    this.menu.open('main-content');
  }

  doRefresh(event) {
    this.loadCards();
    event.target.complete();
  }

}
