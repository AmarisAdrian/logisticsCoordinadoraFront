import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth-routing.module';

export const routes: Routes = [
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
