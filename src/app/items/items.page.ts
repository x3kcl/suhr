import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  name: string;
  id: string;

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.params.id;
    this.name = this.route.snapshot.params.name;
    
    console.log("Item got name " + this.name + " and id " + this.id);
  }
  ngOnInit() {
  }

}
