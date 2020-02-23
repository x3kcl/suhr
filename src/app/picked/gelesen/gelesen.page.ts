import { Component, OnInit } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-gelesen',
  templateUrl: './gelesen.page.html',
  styleUrls: ['./gelesen.page.scss'],
})
export class GelesenPage implements OnInit {
  File: any;
  Gelesenes: any = [];
  Gelesen: any;
  myTitle: string = 'Default Title';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Gelesen = this.router.getCurrentNavigation().extras.state.documents;
        this.myTitle = this.Gelesen.title;
        console.log("Gelesen", this.Gelesen);
      }
    });
  }

  ngOnInit() {
    this.loadGelesen();
  }

  loadGelesen() {
    return this.document.getGelesen(this.Gelesen.id).subscribe((data: any) => {
      //console.log(data);
      let items = data['data'];
      let result = [];
      let url = "";
      for (let item of items) {
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          gelesenes_id: item.gelesenes_id.id,
          url: item.file.data.full_url,
          title: item.file.title,
          size: prettyBytes(item.file.filesize)
        };
        //console.log("size", item.file.filesize);
        result[result.length] = tmp;
      }
      this.Gelesenes = result;
    })
  }

}
