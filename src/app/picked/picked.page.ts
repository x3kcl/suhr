import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

import * as prettyBytes from 'pretty-bytes';
import { ItemsService } from '../services/items.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-picked',
  templateUrl: './picked.page.html',
  styleUrls: ['./picked.page.scss'],
})
export class PickedPage implements OnInit {
  File: any = [];
  Gelesenes: any = [];

  constructor(
    public restApi: FileService, 
    public documents: ItemsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadGelesenesSections()
  }

  loadGelesenesSections() {
    return this.documents.getGelesenes().subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = '/gelesen/' + item.id;
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner,
          created_on: item.created_on,
          title: item.title,
          url: url
        };
        result[result.length] = tmp;
      }    
      this.Gelesenes = result;
    } )
  }

  openDetailsWithState(documents) {
    let navigationExtras: NavigationExtras = {
      state: {
        documents: documents
      }
    };
    console.log(documents);
    this.router.navigate(['gelesen'], navigationExtras);
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
    
      //console.log(this.File);      
    })
  }

  doRefresh(event) {
    this.loadPicked();
    event.target.complete();
  }
}
