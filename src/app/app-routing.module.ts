import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Component/auth/auth.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { BookComponent } from './Component/book/book.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  
  {path:'auth', component:AuthComponent},
  {path:'dashboard', component:DashboardComponent,canActivate: [authGuard]},
  {path:'getBook', component:BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
