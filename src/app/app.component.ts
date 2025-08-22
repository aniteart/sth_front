import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoMenuModule, PoMenuItem } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoMenuModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  readonly menus: PoMenuItem[] = [
    { label: 'Departamentos', link: '/departments' }
  ];
}
