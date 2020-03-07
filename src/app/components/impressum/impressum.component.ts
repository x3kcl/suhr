import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
})
export class ImpressumComponent implements OnInit {
  text: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {}

  openDetailsWithState( name: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          name
        }
      }
    };
    console.log(name);
    this.router.navigate([ '/' + name ], navigationExtras);
  }

}
