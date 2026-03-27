import { Component } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLinkWithHref],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  role: string | null = '';

  constructor(private authservice: AuthService) {
    this.role = this.authservice.getUserRole();
  }

  logout() {
    this.authservice.logout();
    location.href = '/login';
  }
}
