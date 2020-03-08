import { Component, OnInit } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';

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
        const tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          fotos_id: item.fotos_id.id,
          url: item.file.data.thumbnails[3].url,
          full_url: item.file.data.full_url,
          title: item.title ? item.title : item.file.title,
          description: item.description ? item.description : item.file.description,
          size: prettyBytes(item.file.filesize)
        };
        console.log('item', item, tmp);
        result[result.length] = tmp;
      }
      this.Fotos = result;
    });
  }
}
