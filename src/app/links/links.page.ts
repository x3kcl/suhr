import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardService } from '../services/card.service';

@Component({
  standalone: false,
  selector: 'app-links',
  templateUrl: './links.page.html',
  styleUrls: ['./links.page.scss'],
})
export class LinksPage implements OnInit {
  Card: any = [];

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(public restApi: CardService) {}

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.restApi.getLinks()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: {}) => {
      this.Card = data['data'];
    });
    this.refresh$.next();
  }

  doRefresh(event: { target: { complete: () => void } }) {
    this.refresh$.next();
    event.target.complete();
  }
}
