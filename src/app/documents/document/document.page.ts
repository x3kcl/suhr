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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Document = this.router.getCurrentNavigation().extras.state.documents;
        console.log(this.Document);
      }
    });
  }

  ngOnInit() {
    this.loadDocument();
  }

  loadDocument() {
    return this.document.getDocument(this.Document.id).subscribe((data: any) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      let url = "";
      for (let item of items) {
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          //file: item.file,
          created_on: item.created_on,
          documents_id: item.documents_id.id,
          url: '',
          title: item.file.title,
          size: prettyBytes(item.file.filesize)
        };
        console.log("size", item.file.filesize);
        let thumbnails = item.file.data.thumbnails;
        for (let thumbnail of thumbnails) {
          if (thumbnail.dimension === "200x200") {
            console.log(thumbnail);
            let pic = {
              title: thumbnail.title,
              type: thumbnail.type,
              url: thumbnail.url,
              description: thumbnail.description
            };
            tmp.url = pic.url;
          }
        }
        console.log(tmp);
        //this.File = this.loadFileUrl(tmp.file);
        //tmp.url = this.File.url;
        //tmp.title = this.File.title;
        console.log(tmp.url);
        result[result.length] = tmp;
      }
      this.Documents = result;
    })
  }
  loadFileUrl(id) {
    return this.restApi.getFile(id).subscribe((data: any) => {
      let item = data['data'];
      let result = {
        url: ''
      };
      let thumbnails = item.data.thumbnails;
      for (let thumbnail of thumbnails) {
        if (thumbnail.dimension === "200x200") {
          let tmp = {
            title: item.title,
            type: item.type,
            url: thumbnail.url,
            description: item.description
          };
          result = tmp;
        }
      }
      console.log(result);
      this.File = result;
    });
  }

}
