import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,

    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(

          m => m.InicioPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m =>

          m.SearchPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then( m =>

          m.CategoriasPageModule)
      },
      {
        path: 'detalles/:id',
        loadChildren: () => import('../detalles/detalles.module').then( m =>
          m.DetallesPageModule)
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
