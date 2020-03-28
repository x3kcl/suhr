import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import * as prettyBytes from 'pretty-bytes';
import { Item } from '../classes/item';

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
  title = 'Kein Titel';
  subtitle = 'Kein Untertitel';

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
        console.log('Items', this.Item);
        this.subtitle = this.Item.title;
      }
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    return this.items.getItem(this.name, this.id, this.idname).subscribe((data: any) => {
      this.Items = [];
      console.log(data);
      const items = data.data;
      const result = [];
      const url = '';
      for (const item of items) {
        let tmp: Item = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          documents_id: item[ this.idname + '_id'].id,
          url: "/assets/pictures/not-found-image.jpg",
          title: "File not found",
          filename_download: "not-found-image.jpg"
        };
        if ( item.file && item.file.data ) {
          tmp.url = item.file.data.full_url;
          tmp.title = item.file.title;
          tmp.size = prettyBytes(item.file.filesize);
          tmp.filename_download = item.file.data.filename_download;
        }
        if (item[ this.idname + '_id'].title) {
          const info = item[ this.idname + '_id'];
          console.log('title_id', info);
          this.title = info.title;
          this.subtitle = info.subtitle_id.title;
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
