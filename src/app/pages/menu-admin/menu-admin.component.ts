import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';


@Component({
  selector: 'app-menu-admin',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    RouterOutlet,
  ],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss'
})
export class MenuAdminComponent {
  
    constructor(private router: Router) {}

    readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => this.navigateHome() },
    { label: 'Funcionários', link: '/employees' },
    { label: 'Departamentos', link: '/departments' },
    { label: 'Cargos', link: '/positions' }
  ];

  private navigateHome() {
    this.router.navigate(['/']);
  }
}
