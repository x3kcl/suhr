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
    path: 'fotos',
    loadChildren: () => import('./fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'picked',
    loadChildren: () => import('./picked/picked.module').then( m => m.PickedPageModule)
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
    path: 'links',
    loadChildren: () => import('./links/links.module').then( m => m.LinksPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
