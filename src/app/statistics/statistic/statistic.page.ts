import { Component, OnInit } from '@angular/core';
import * as prettyBytes from 'pretty-bytes';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.page.html',
  styleUrls: ['./statistic.page.scss'],
})
export class StatisticPage implements OnInit {
  File: any;
  Statistics: any = [];
  Statistic: any;
  myTitle: string = 'Default Title';
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.id = this.route.snapshot.params.id;
    console.log("got id " + this.id);

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Statistic = this.router.getCurrentNavigation().extras.state.documents;
        this.myTitle = this.Statistic.title;
        console.log("Statistic", this.Statistic);
      }
    });
  }

  ngOnInit() {
    this.loadStatistic();
  }

  loadStatistic() {
    return this.document.getStatistic(this.id).subscribe((data: any) => {
      //console.log(data);
      let items = data['data'];
      let result = [];
      let url = "";
      for (let item of items) {
        let tmp = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          statistics_id: item.statistics_id.id,
          url: item.file.data.full_url,
          title: item.file.title,
          size: prettyBytes(item.file.filesize)
        };
        //console.log("size", item.file.filesize);
        result[result.length] = tmp;
      }
      this.Statistics = result;
    })
  }

}
