import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickedPage } from './picked.page';

const routes: Routes = [
  {
    path: '',
    component: PickedPage
  },
  {
    path: 'gelesen',
    loadChildren: () => import('./gelesen/gelesen.module').then( m => m.GelesenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickedPageRoutingModule {}
