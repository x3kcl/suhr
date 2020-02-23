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
  myTitle: string = 'Default Title';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Foto = this.router.getCurrentNavigation().extras.state.documents;
        this.myTitle = this.Foto.title;
        console.log("Foto", this.Foto);
      }
    });
  }

  ngOnInit() {
    this.loadFoto();
  }

  loadFoto() {
    return this.document.getFoto(this.Foto.id).subscribe((data: any) => {
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
          fotos_id: item.fotos_id.id,
          url: item.file.data.full_url,
          title: item.file.title,
          size: prettyBytes(item.file.filesize)
        };
        //console.log("size", item.file.filesize);
        result[result.length] = tmp;
      }
      this.Fotos = result;
    })
  }
}
