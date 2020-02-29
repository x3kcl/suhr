import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'document/:id',
    loadChildren: () => import('./documents/document/document.module').then( m => m.DocumentPageModule)
  },
  {
    path: 'fotos',
    loadChildren: () => import('./fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'foto/:id',
    loadChildren: () => import('./fotos/foto/foto.module').then( m => m.FotoPageModule)
  },
  {
    path: 'picked',
    loadChildren: () => import('./picked/picked.module').then( m => m.PickedPageModule)
  },
  {
    path: 'gelesen/:id',
    loadChildren: () => import('./picked/gelesen/gelesen.module').then( m => m.GelesenPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'statistic/:id',
    loadChildren: () => import('./statistics/statistic/statistic.module').then( m => m.StatisticPageModule)
  },
  {
    path: 'links',
    loadChildren: () => import('./links/links.module').then( m => m.LinksPageModule)
  },
  {
    path: 'item/:name/:subname',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'items/:name/:id',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
  },
  { 
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
