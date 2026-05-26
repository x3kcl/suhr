import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardService } from '../services/card.service';

@Component({
  standalone: false,
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  Card: any = [];

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(public restApi: CardService) {}

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.restApi.getMembers()),
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
