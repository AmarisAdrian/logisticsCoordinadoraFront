import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
   {
    path: 'dashboard',
    component: LayoutComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    children: AUTH_ROUTES
  }
];
