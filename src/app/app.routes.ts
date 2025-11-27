import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes/list',
    pathMatch: 'full'
  },
  { path: 'heroes/detail/:id',
    loadComponent: () => import('./heroes/pages/hero-detail/hero-detail.component').then(m => m.HeroDetailComponent)
  },
  {
    path: 'heroes/list',
    loadComponent: () => import('./heroes/pages/heroes-list/heroes-list.component').then(m => m.HeroesListComponent)
  },
  {
    path: 'heroes/add',
    loadComponent: () => import('./heroes/pages/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  },
  {
    path: 'heroes/edit/:id',
    loadComponent: () => import('./heroes/pages/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  }
];
