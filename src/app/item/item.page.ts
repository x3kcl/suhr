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
  title: string;
  subtitle: string;
  idname: string;

  constructor(
    private route: ActivatedRoute,
    public items: ItemsService,
    private router: Router,
  ) {
    this.name = this.route.snapshot.params.name;
    this.subname = this.route.snapshot.params.subname;
    this.idname = this.route.snapshot.params.idname;
    console.log('Item got name ' + this.name + ' with sub name ' + this.subname + ' id name ' + this.idname);
  }
  ngOnInit() {
    this.loadDocumentSections();
  }

  loadDocumentSections() {
    return this.items.getItems(this.name).subscribe((data: any ) => {
      console.log(data);
      const items = data.data;
      const result = [];
      for ( const item of items ) {
        const url = 'items/' + this.subname + '/' + item.id + '/' + this.idname;
        const tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner,
          created_on: item.created_on,
          title: item.title,
          url
        };
        if (item.title_id.title) {
          this.title = item.title_id.title;
          this.subtitle = item.title_id.subtitle;
        }
        result[result.length] = tmp;
      }
      this.Items = result;
    } );
  }

  openDetailsWithState(item: { id: string; title: string; url: string; }) {
    const navigationExtras: NavigationExtras = {
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
