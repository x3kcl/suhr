import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.page.html',
  styleUrls: ['./links.page.scss'],
})
export class LinksPage implements OnInit {

  Card: any = [];

  constructor(
    public restApi: CardService, 
  ) {}

  ngOnInit() {
    this.loadLinks()
  }

  // Get employees list
  loadLinks() {
    return this.restApi.getLinks().subscribe((data: {}) => {
      //let items = data.
      //console.log(data['data'][0]);
      this.Card = data['data'];
      console.log(this.Card);
    })
  }

}
