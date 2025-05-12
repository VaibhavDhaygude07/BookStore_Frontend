import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Component/auth/auth.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { BookComponent } from './Component/book/book.component';
import { authGuard } from './auth.guard';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';


const routes: Routes = [
  
  {path:'auth', component:AuthComponent},
 
  {path:'dashboard', component:DashboardComponent,canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'getBook', pathMatch: 'full' },
      {path:'getBook', component:BookComponent},
      { path: 'bookdetails/:id', component: BookdetailsComponent },
      {path:'cart', component:CartComponent},
     
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
