import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Component/auth/auth.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { BookComponent } from './Component/book/book.component';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
import { OrderSuccessComponent } from './Component/order-success/order-success.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { WishlistService } from './Services/Wishlist/wishlist.service';
import { OrderDetailsComponent } from './Component/order-details/order-details.component';
import { MatBadgeModule } from '@angular/material/badge';





@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    BookComponent,
    BookdetailsComponent,
    CartComponent,
    OrderSuccessComponent,
    WishlistComponent,
    OrderDetailsComponent
   
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
    MatBadgeModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
