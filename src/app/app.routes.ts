import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'departamentos',
    loadChildren: () => import('./pages/departments/departments.routes').then(m => m.DEPARTMENTS_ROUTES)
  },

  {
    path: '',
    redirectTo: 'departamentos',
    pathMatch: 'full'
  }
];
