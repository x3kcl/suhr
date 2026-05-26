import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { FileService } from 'src/app/services/file.service';
import { Item } from 'src/app/classes/item';
import filesize from 'file-size';

@Component({
  standalone: false,
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {
  File: any;
  Fotos: any = [];
  Foto: any;
  myTitle = '';
  id: string;

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public document: ItemsService,
    public restApi: FileService,
  ) {
    this.id = this.route.snapshot.params.id;
    console.log('got id ' + this.id);

    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras?.state) {
        this.Foto = nav.extras.state['item'];
        this.myTitle = this.Foto.title;
      }
    });
  }

  ngOnInit() {
    this.loadFoto();
  }

  loadFoto() {
    return this.document.getFoto(this.id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: any) => {
      const items = data.data;
      const result = [];
      for (const item of items) {
        let tmp: Item = {
          id: item.id,
          status: item.status,
          owner: item.owner.id,
          created_on: item.created_on,
          fotos_id: item.fotos_id.id,
          url: "/assets/pictures/not-found-image.jpg",
          title: "File not found",
          filename_download: "not-found-image.jpg"
        };
        if ( item.file && item.file.data ) {
          tmp.url = item.file.data.thumbnails[3].url;
          tmp.full_url = item.file.data.full_url;
          tmp.title = item.title ? item.title : item.file.title;
          tmp.description = item.description ? item.description : item.file.description;
          tmp.size = filesize(item.file.filesize).human();
          tmp.filename_download = item.file.data.filename_download;
        }
        console.log('item', item, tmp);
        result[result.length] = tmp;
      }
      this.Fotos = result;
    });
  }
}
