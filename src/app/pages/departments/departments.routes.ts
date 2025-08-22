import { Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

export const DEPARTMENTS_ROUTES: Routes = [
  {
    path: '',
    component: DepartmentsComponent
  },
  {
    path: 'novo',
    component: DepartmentFormComponent
  },
  {
    path: ':id/editar',
    component: DepartmentFormComponent
  }
];
