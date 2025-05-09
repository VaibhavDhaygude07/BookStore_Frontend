import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //  token: any;
 constructor(private httpclient:HttpClient, private httpService: HttpService) { }

   private get token() {
    return localStorage.getItem('token'); // or sessionStorage.getItem('token')
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
 
}
