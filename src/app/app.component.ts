import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { MenuAdminComponent } from './pages/menu-admin/menu-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuAdminComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
