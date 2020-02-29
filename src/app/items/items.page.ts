import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import * as prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  Items: any = [];
  Item: any;
  name: string;
  id: string;
  idname: string;
  title: string;
  subtitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public items: ItemsService,
  ) {
    this.id = this.route.snapshot.params.id;
    this.name = this.route.snapshot.params.name;
    this.idname = this.route.snapshot.params.idname;

    console.log('Item got name ' + this.name + ' and id ' + this.id + ' id name ' + this.idname);

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Item = this.router.getCurrentNavigation().extras.state.item;
        console.log('Items' + this.Item);
      }
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    return this.items.getItem(this.name, this.id, this.idname).subscribe((data: any) => {
      console.log(data);
      const items = data.data;
      const result = [];
      const url = '';
      for (const item of items) {
        const tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          documents_id: item.documents_id.id,
          url: item.file.data.full_url,
          title: item.file.title,
          size: prettyBytes(item.file.filesize),
          filename_download: item.file.data.filename_download
        };
        if (item.title_id.title) {
          this.title = item.title_id.title;
          this.subtitle = item.title_id.subtitle;
        }
        // console.log("size", item.file.filesize);
        result[result.length] = tmp;
      }
      this.Items = result;

    });
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    this.loadItems();
    event.target.complete();
  }

}
