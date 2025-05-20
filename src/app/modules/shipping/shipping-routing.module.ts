import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingCreateComponent } from './components/shipping-create/shipping-create.component';

const routes: Routes = [
  { path: 'crear', component: ShippingCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingRoutingModule {}
