import { Routes } from '@angular/router';
import { heroExistsGuard } from './heroes/guards/hero-exists.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes/list',
    pathMatch: 'full'
  },
  { path: 'heroes/detail/:id',
    canActivate: [heroExistsGuard],
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
    canActivate: [heroExistsGuard],
    loadComponent: () => import('./heroes/pages/hero-form/hero-form.component').then(m => m.HeroFormComponent)
  }
];
