import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   constructor(private httpService: HttpService) {}

  private get token() {
    return localStorage.getItem('token');
  }

  getAllOrders() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.get('https://localhost:7288/api/order', true, headers);
  }

  placeOrder() {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    };
    return this.httpService.postMethod('https://localhost:7288/api/order', {}, true, headers);
  }
}
