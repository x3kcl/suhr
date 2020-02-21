import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

import * as prettyBytes from 'pretty-bytes';
import { ItemsService } from '../services/items.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})

export class DocumentsPage implements OnInit {
  //apiURL = 'https://cms.naumann.hosting';
  File: any = [];
  Documents: any = [];

  constructor(
    public restApi: FileService, 
    public documents: ItemsService,
    private router: Router,
  ) {}

  ngOnInit() {
    //this.loadDocuments()
    this.loadDocumentSections()
  }

  loadDocumentSections() {
    return this.documents.getDocuments().subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = '/document/';// + item.id;
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
      this.Documents = result;
    } )
  }

  openDetailsWithState(documents) {
    let navigationExtras: NavigationExtras = {
      state: {
        documents: documents
      }
    };
    console.log(documents);
    this.router.navigate(['document'], navigationExtras);
  }

  // Get employees list
  loadDocuments() {
    return this.restApi.getDocuments().subscribe((data: any ) => {
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
          size: prettyBytes(item.filesize) //( item.filesize * 0.001 ).toFixed(2)
        };
        result[result.length] = tmp;
      }    
      this.File = result;
      //console.log(this.File);      
    })
  }


  doRefresh(event) {
    //this.loadDocuments();
    this.loadDocumentSections();
    event.target.complete();
  }

}
