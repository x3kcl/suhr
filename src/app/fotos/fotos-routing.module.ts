import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosPage } from './fotos.page';

const routes: Routes = [
  {
    path: '',
    component: FotosPage
  },
  {
    path: 'foto',
    loadChildren: () => import('./foto/foto.module').then( m => m.FotoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosPageRoutingModule {}
