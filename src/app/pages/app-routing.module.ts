import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './menu-admin/menu-admin.component'


export const routes: Routes = [
  {
    path: 'Funcionários',
    component: MenuAdminComponent,
    children: [
      {
       // path: 'funcionarios', loadChildren: () => import('./employees/employees.module').then(m => m.FuncionarioModule) // ex. em teste
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}


