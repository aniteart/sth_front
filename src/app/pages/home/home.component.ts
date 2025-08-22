import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'
import { PoMenuItem, PoMenuModule, PoPageModule, PoToolbarModule, PoImageModule } from '@po-ui/ng-components';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    PoToolbarModule,
    PoImageModule,
    PoMenuModule,
    PoPageModule
  ],
})
export class HomeComponent {

}
