import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { OrderService } from '../../Services/Order/order.service';

interface BookOrder {
  bookName: string;
  author: string;
  price: number;
  originalPrice: number;
  bookImage: string;
  orderDate: string;
}

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {

   orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.orders = res.data.map((item: any) => ({
            bookName: item.book?.bookName,
            author: item.book?.author,
            price: item.book?.discountPrice,
            originalPrice: item.book?.price,
            bookImage: item.book?.bookImage,
            orderDate: item.book?.createdAtDate
          }));
        } else {
          this.orders = [];
        }
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
