import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

import * as prettyBytes from 'pretty-bytes';
import { ItemsService } from '../services/items.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  File: any = [];
  Statistics: any = [];

  constructor(
    public restApi: FileService, 
    public documents: ItemsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadStatisticsSections()
  }

  loadStatisticsSections() {
    return this.documents.getStatistics().subscribe((data: any ) => {
      console.log(data);
      let items = data['data'];
      let result = [];
      for ( let item of items ) {
        let url = '/statistic/' + item.id;
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
      this.Statistics = result;
    } )
  }

  openDetailsWithState(documents) {
    let navigationExtras: NavigationExtras = {
      state: {
        documents: documents
      }
    };
    console.log(documents);
    this.router.navigate(['statistic/' + documents.id ], navigationExtras);
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
