import { Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Core/Guards/auth.guard';
import { DashboardLayoutComponent } from './Shared/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { SuperAdminComponent } from './Components/super-admin/super-admin.component';
import { AdminComponent } from './Components/admin/admin.component';
import { MemberComponent } from './Components/member/member.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboardlayout',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'superadmin',
        component: SuperAdminComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'member',
        component: MemberComponent,
      },
    ],
  },
];
