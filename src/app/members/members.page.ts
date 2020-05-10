import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  Card: any = [];

  constructor(
    public restApi: CardService,
  ) {}

  ngOnInit() {
    this.loadMembers()
  }

  loadMembers() {
    return this.restApi.getMembers().subscribe((data: {}) => {
      // let items = data.
      // console.log(data['data'][0]);
      this.Card = data['data'];
      // console.log(this.Card);
    })
  }

  doRefresh(event) {
    this.loadMembers();
    event.target.complete();
  }
}
