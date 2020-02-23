import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GelesenPage } from './gelesen.page';

const routes: Routes = [
  {
    path: '',
    component: GelesenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GelesenPageRoutingModule {}
