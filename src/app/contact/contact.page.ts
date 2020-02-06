import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  Card: any = [];

  constructor(
    public restApi: CardService, 
  ) {}

  ngOnInit() {
    this.loadContacts()
  }

  // Get employees list
  loadContacts() {
    return this.restApi.getContacts().subscribe((data: {}) => {
      //let items = data.
      //console.log(data['data'][0]);
      this.Card = data['data'];
      console.log(this.Card);
    })
  }


}
