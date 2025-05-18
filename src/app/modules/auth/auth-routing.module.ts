import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
