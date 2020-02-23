import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsPage } from './statistics.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then( m => m.StatisticPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsPageRoutingModule {}
