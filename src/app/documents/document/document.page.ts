import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';
import * as prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
})


export class DocumentPage implements OnInit {
  File: any;
  Documents: any = [];
  Document: any;
  myTitle: string = '';
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.id = this.route.snapshot.params.id;
    console.log("got id " + this.id);
    //this.Document.id = this.id;

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Document = this.router.getCurrentNavigation().extras.state.item;
        this.myTitle = this.Document.title;
        console.log("Dokument", this.Document);
        //console.log("got id " + this.id);
      }
    });
  }

  ngOnInit() {
    this.loadDocument();
  }

  loadDocument() {
    return this.document.getDocument(this.id).subscribe((data: any) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      let url = "";
      for (let item of items) {
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          documents_id: item.documents_id.id,
          url: item.file.data.full_url,
          title: item.file.title,
          size: prettyBytes(item.file.filesize),
          filename_download: item.file.data.filename_download
        };
        //console.log("size", item.file.filesize);
        result[result.length] = tmp;
      }
      this.Documents = result;

    })
  }

}
