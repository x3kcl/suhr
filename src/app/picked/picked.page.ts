import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

const prettyBytes = require('pretty-bytes');

@Component({
  selector: 'app-picked',
  templateUrl: './picked.page.html',
  styleUrls: ['./picked.page.scss'],
})
export class PickedPage implements OnInit {
  File: any = [];

  constructor(
    public restApi: FileService, 
  ) {}

  ngOnInit() {
    this.loadPicked()
  }

  // Get employees list
  loadPicked() {
    return this.restApi.getPicked().subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = item.data.full_url;
        let tmp = {
          title: item.title,
          type: item.type,
          url: url,
          description: item.description,
          size: prettyBytes(item.filesize)
        };
        result[result.length] = tmp;
      }    
      this.File = result;
    
      console.log(this.File);      
    })
  }
}
