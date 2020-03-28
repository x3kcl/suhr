import { Component, OnInit } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {
  File: any;
  Fotos: any = [];
  Foto: any;
  myTitle = '';
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.id = this.route.snapshot.params.id;
    console.log('got id ' + this.id);

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Foto = this.router.getCurrentNavigation().extras.state.item;
        this.myTitle = this.Foto.title;
        // console.log("Foto", this.Foto);
      }
    });
  }

  ngOnInit() {
    this.loadFoto();
  }

  loadFoto() {
    return this.document.getFoto(this.id).subscribe((data: any) => {
      // console.log(data);
      const items = data.data;
      const result = [];
      const url = '';
      for (const item of items) {
        let tmp: Item = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          fotos_id: item.fotos_id.id,
          url: "/assets/pictures/not-found-image.jpg",
          title: "File not found",
          filename_download: "not-found-image.jpg"
        };
        if ( item.file && item.file.data ) {
          tmp.url = item.file.data.thumbnails[3].url;
          tmp.full_url = item.file.data.full_url;
          tmp.title = item.title ? item.title : item.file.title;
          tmp.description = item.description ? item.description : item.file.description;
          tmp.size = prettyBytes(item.file.filesize);
          tmp.filename_download = item.file.data.filename_download;
        }
        console.log('item', item, tmp);
        result[result.length] = tmp;
      }
      this.Fotos = result;
    });
  }
}
