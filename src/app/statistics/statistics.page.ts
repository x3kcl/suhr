import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

import * as prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  File: any = [];

  constructor(
    public restApi: FileService, 
  ) {}

  ngOnInit() {
    this.loadStatistics()
  }

  // Get employees list
  loadStatistics() {
    return this.restApi.getStatistics().subscribe((data: any ) => {
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
    this.loadStatistics();
    event.target.complete();
  }

}
