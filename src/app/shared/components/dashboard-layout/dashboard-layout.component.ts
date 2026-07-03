import { Component } from '@angular/core';
import HeaderMenuComponent from '../header-menu/header-menu.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  imports: [HeaderMenuComponent],
})
export class DashboardLayoutComponent {}
