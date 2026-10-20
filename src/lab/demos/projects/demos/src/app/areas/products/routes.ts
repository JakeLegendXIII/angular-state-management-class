import { Home } from './home';
import type { Routes } from '@angular/router';
import { Index } from './pages';
import { Details } from './pages/details';

export const productsRoutes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: Index,
        children: [{ path: ':id', component: Details }],
      },
    ],
  },
];
