import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Component/auth/auth.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { BookComponent } from './Component/book/book.component';
import { authGuard } from './auth.guard';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
import { OrderSuccessComponent } from './Component/order-success/order-success.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { OrderDetailsComponent } from './Component/order-details/order-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'getBook', pathMatch: 'full' },
      { path: 'getBook', component: BookComponent },
      { path: 'bookdetails/:id', component: BookdetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'order-success', component: OrderSuccessComponent },
      {path:'order-details', component:OrderDetailsComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
