import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  Items: any = [];
  name: string;
  subname: string;

  constructor(
    private route: ActivatedRoute,
    public items: ItemsService,
    private router: Router,
  ) { 
    this.name = this.route.snapshot.params.name;
    this.subname = this.route.snapshot.params.subname;
    console.log("Item got name " + this.name + " with sub name " + this.subname);
  }
  ngOnInit() {
    this.loadDocumentSections()
  }

  loadDocumentSections() {
    return this.items.getItems(this.name).subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = this.subname + '/' + item.id;
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner,
          created_on: item.created_on,
          title: item.title,
          url: url
        };
        result[result.length] = tmp;
      }    
      this.Items = result;
    } )
  }

  openDetailsWithState(item: { id: string; title: string; url: string; }) {
    let navigationExtras: NavigationExtras = {
      state: {
        item: { 
          id: item.id, 
          title: item.title 
        }
      }
    };
    console.log(item);
    this.router.navigate([ item.url ], navigationExtras);
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    this.loadDocumentSections();
    event.target.complete();
  }
}
