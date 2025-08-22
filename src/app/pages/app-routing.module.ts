import { Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';

export const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: '', redirectTo: 'departments', pathMatch: 'full' }
];


