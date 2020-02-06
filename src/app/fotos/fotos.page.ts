import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
})
export class FotosPage implements OnInit {

  //http://localhost:8080/_/files?filter[tags][in]=iway

  File: any = [];

  constructor(
    public restApi: FileService, 
  ) {}

  ngOnInit() {
    this.loadFiles()
  }

  // Get employees list
  loadFiles() {
    return this.restApi.getFiles().subscribe((data: any ) => {
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let thumbnails = item.data.thumbnails;
        let url = "";
        for (let thumbnail of thumbnails ) {
          if ( thumbnail.dimension === "200x200") {
            url = thumbnail.url;
          }
        }
        let tmp = {
          title: item.title,
          type: item.type,
          url: url,
          description: item.description
        };
        result[result.length] = tmp;
      }    
      this.File = result;
    
      console.log(this.File);      
    })
  }

}
