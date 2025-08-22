import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { EmployeesComponent } from './employees/employees.component'


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    title: 'Funcionários'
  },
  // {
  //   path: 'employees/new',
  //   component: EmployeesFormComponent,
  //   title: 'Funcionários'
  // }
];


