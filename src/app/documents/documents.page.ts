import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  File: any = [];

  constructor(
    public restApi: FileService, 
  ) {}

  ngOnInit() {
    this.loadDocuments()
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
          description: item.description
        };
        result[result.length] = tmp;
      }    
      this.File = result;
    
      console.log(this.File);      
    })
  }

}
