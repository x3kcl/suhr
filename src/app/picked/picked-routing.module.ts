import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickedPage } from './picked.page';

const routes: Routes = [
  {
    path: '',
    component: PickedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickedPageRoutingModule {}
