import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/auth-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
   {
    path: 'dashboard',
    canActivate: [AuthGuard],
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
  },
    {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/users/users-routing.module').then(m => m.UsersRoutingModule)
  },
  {
    path: 'envios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/shipping/shipping-routing.module').then(m => m.ShippingRoutingModule)
  },
];