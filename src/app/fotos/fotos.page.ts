import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { ItemsService } from '../services/items.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {
  File: any = [];
  Fotos: any = [];

  constructor(
    public restApi: FileService,
    public documents: ItemsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadFotoSections();
  }

  loadFotoSections() {
    return this.documents.getFotos().subscribe((data: any ) => {
      console.log(data);
      const items = data.data;
      const result = [];
      for ( const item of items ) {
        const url = '/foto/' + item.id;
        const tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner,
          created_on: item.created_on,
          title: item.title,
          url
        };
        result[result.length] = tmp;
      }
      this.Fotos = result;
    } );
  }

  openDetailsWithState(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        item
      }
    };
    console.log(item);
    this.router.navigate(['foto/' + item.id ], navigationExtras);
  }

  // Get employees list
  loadFiles() {
    return this.restApi.getFiles().subscribe((data: any ) => {
      const items = data.data;
      const result = [];
      for ( const item of items ) {
        const thumbnails = item.data.thumbnails;
        let url = '';
        for (const thumbnail of thumbnails ) {
          if ( thumbnail.dimension === '200x200') {
            url = thumbnail.url;
          }
        }
        const tmp = {
          title: item.title,
          type: item.type,
          url,
          description: item.description
        };
        result[result.length] = tmp;
      }
      this.File = result;
      // console.log(this.File);
    });
  }

  doRefresh(event) {
    this.loadFiles();
    event.target.complete();
  }
}
