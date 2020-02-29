import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

import * as prettyBytes from 'pretty-bytes';
import { ItemsService } from '../services/items.service';
import { NavigationExtras, Router } from '@angular/router';
import { Item } from '../classes/item';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})

export class DocumentsPage implements OnInit {
  Documents: any = [];
  name: string = 'documents';
  subName: string = 'document';

  constructor(
    public restApi: FileService, 
    public documents: ItemsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadDocumentSections()
  }

  loadDocumentSections() {
    return this.documents.getItems(this.name).subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = this.subName + '/' + item.id;
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner,
          created_on: item.created_on,
          title: item.title,document,
          url: url
        };
        result[result.length] = tmp;
      }    
      this.Documents = result;
    } )
  }

  openDetailsWithState(item: { id: string; title: string; url: string; }) {
    let navigationExtras: NavigationExtras = {
      state: {
        item: { 
          id: item.id, 
          title: item.title 
        }
      }
    };
    console.log(item);
    this.router.navigate([ item.url ], navigationExtras);
  }

  doRefresh(event: { target: { complete: () => void; }; }) {
    this.loadDocumentSections();
    event.target.complete();
  }

}
