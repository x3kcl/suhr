import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardService } from '../services/card.service';

@Component({
  standalone: false,
  selector: 'app-impressum',
  templateUrl: './impressum.page.html',
  styleUrls: ['./impressum.page.scss'],
})
export class ImpressumPage implements OnInit {
  Card: any = [];
  title: string;

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(public restApi: CardService) {
    this.title = 'Über uns';
  }

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.restApi.getImpressum()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      const items = data.data;
      items.sort((item1: { id: number }, item2: { id: number }) => {
        if (item1.id < item2.id) { return 1; }
        if (item1.id > item2.id) { return -1; }
        return 0;
      });
      this.Card = items;
    });
    this.refresh$.next();
  }

  doRefresh(event: { target: { complete: () => void } }) {
    this.refresh$.next();
    event.target.complete();
  }
}
