import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardService } from '../services/card.service';

@Component({
  standalone: false,
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  Card: any = [];

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(public restApi: CardService) {}

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.restApi.getContacts()),
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
