import { Component } from '@angular/core';
import { CardService } from "../services/card.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Card: any = [];

  constructor(
    public restApi: CardService, 
  ) {}

  ngOnInit() {
    this.loadCards()
  }

  // Get employees list
  loadCards() {
    return this.restApi.getCards().subscribe((data: {}) => {
      //let items = data.
      //console.log(data['data'][0]);
      this.Card = data['data'];
      //console.log(this.Card);
    })
  }

  doRefresh(event) {
    this.loadCards();
    event.target.complete();
  }

}
