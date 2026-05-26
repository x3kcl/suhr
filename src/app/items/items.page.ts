import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../classes/item';
import filesize from 'file-size';

@Component({
  standalone: false,
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  Items: any = [];
  Item: any;
  name: string;
  id: string;
  idname: string;
  title = 'Kein Titel';
  subtitle = 'Kein Untertitel';

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public items: ItemsService,
  ) {
    this.id = this.route.snapshot.params.id;
    this.name = this.route.snapshot.params.name;
    this.idname = this.route.snapshot.params.idname;

    console.log('Item got name ' + this.name + ' and id ' + this.id + ' id name ' + this.idname);

    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras?.state) {
        this.Item = nav.extras.state['item'];
        console.log('Items', this.Item);
        this.subtitle = this.Item.title;
      }
    });
  }

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.items.getItem(this.name, this.id, this.idname)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: any) => {
      this.Items = [];
      console.log(data);
      const items = data.data;
      const result = [];
      for (const item of items) {
        const tmp: Item = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          documents_id: item[this.idname + '_id'].id,
          url: '/assets/pictures/not-found-image.jpg',
          title: 'File not found',
          filename_download: 'not-found-image.jpg'
        };
        if (item.file && item.file.data) {
          tmp.url = item.file.data.full_url;
          tmp.title = item.file.title;
          tmp.size = filesize(item.file.filesize).human();
          tmp.filename_download = item.file.data.filename_download;
        }
        if (item[this.idname + '_id'].title) {
          const info = item[this.idname + '_id'];
          console.log('title_id', info);
          this.title = info.title;
          this.subtitle = info.subtitle_id.title;
        }
        result[result.length] = tmp;
      }
      this.Items = result;
    });
    this.refresh$.next();
  }

  doRefresh(event: { target: { complete: () => void } }) {
    this.refresh$.next();
    event.target.complete();
  }
}
