import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes/list',
    pathMatch: 'full'
  },
  {
    path: 'heroes/list',
    loadComponent: () => import('./heroes/pages/heroes-list/heroes-list.component').then(m => m.HeroesListComponent)
  }
];
