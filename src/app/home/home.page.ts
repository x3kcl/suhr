import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardService } from '../services/card.service';
import { MenuController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  Card: any = [];

  private destroyRef = inject(DestroyRef);
  private refresh$ = new Subject<void>();

  constructor(
    public restApi: CardService,
    private menu: MenuController,
  ) {}

  ngOnInit() {
    this.refresh$.pipe(
      switchMap(() => this.restApi.getCards()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.Card = data.data;
    });
    this.refresh$.next();
    this.openMenu();
  }

  openMenu() {
    this.menu.enable(true, 'main-content');
    this.menu.open('main-content');
  }

  doRefresh(event: { target: { complete: () => void } }) {
    this.refresh$.next();
    event.target.complete();
  }
}
