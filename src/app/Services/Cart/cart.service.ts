import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RefreshService } from '../Refresh/refresh.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();
  
 constructor(private httpclient:HttpClient, private httpService: HttpService,private refreshService: RefreshService) { }

   private get token() {
    return localStorage.getItem('token'); 
  }
   emitCartRefresh() {
    this.refreshService.emitCartRefresh();
  }

getItemByCartId(cartId: number) {
  
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    }
  };
  return this.httpService.get(`https://localhost:7288/api/cart/${cartId}`, true, headers);
}
  getCartItemByBookId(bookId: number) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.get(`https://localhost:7288/api/cart/book/${bookId}`, true, headers);
  }

  getAllItemsInCart() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.get('https://localhost:7288/api/cart/all', true, headers);
  }
  addBookToCart(data: any) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.postMethod('https://localhost:7288/api/cart', data, true, headers);
  }
  removeBookFromCart(cartId: number) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.delete(`https://localhost:7288/api/cart/${cartId}`, true, headers);
  }

 

  getCustomerDetails() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.get('https://localhost:7288/api/cart/customer', true, headers);
  }

  updateCartItem(cartId: number, data: any) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.put(`https://localhost:7288/api/cart/${cartId}`, data, true, headers);
  }

   addCustomer(data: any) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.postMethod('https://localhost:7288/api/customer/customer', data, true, headers);
  }

 

  getCustomer() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.get('https://localhost:7288/api/customer', true, headers);
  }

//   getAllOrders() {
//   const headers = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.token}`
//     }
//   };
//   return this.httpService.get('https://localhost:7288/api/order', true, headers);
// }

// placeOrder() {
//   const headers = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.token}`
//     }
//   };
//   return this.httpService.postMethod('https://localhost:7288/api/order', {}, true, headers);
// }



}

