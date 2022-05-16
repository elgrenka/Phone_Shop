import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartPageComponent } from './cart-page/cart-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
// import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: MainPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'product/:id', component: ProductPageComponent}
  ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
  // {path: 'admin', loadChildren: () => AdminModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
