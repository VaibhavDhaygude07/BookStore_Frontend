import { Component, OnInit } from '@angular/core';

import { CartService } from '../../Services/Cart/cart.service';

interface CartItem {
  cartItemId: number;
  userId: number;
  bookId: number;
  bookQuantity: number;
  price: number;
  isPurchased: boolean;
  totalPrice: number;
  book?: Book;
}

interface Book {
  id: number;
  bookName: string;
  author: string;
  price: number;
  discountPrice: number;
  bookImage: string;
  description: string;
  quantity: number;
}


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
 cartItems: CartItem[] = [];
  error: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

getAllCartItems(): void {
  this.cartService.getAllItemsInCart().subscribe({
    next: (res: any) => {
      this.cartItems = res.data.cartItems;
      console.log('Cart items:', this.cartItems);
    },
    error: (err) => {
      console.error('Error fetching cart items:', err);
      this.error = 'Failed to load cart items.';
    }
  });
}




  increaseQuantity(item: CartItem): void {
    const reqData = { bookId: item.bookId };

    this.cartService.addBookToCart(reqData).subscribe({
      next: () => {
        item.bookQuantity++;
        this.getAllCartItems();
        console.log('Quantity increased:', item.bookQuantity);
      },
      error: (err) => {
        console.error('Error increasing quantity:', err);
      }
    });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.bookQuantity === 1) {
      this.removeItemFromCart(item);
    } else {
      this.cartService.removeBookFromCart(item.cartItemId).subscribe({
        next: () => {
          item.bookQuantity--;
          this.getAllCartItems();
          console.log('Quantity decreased:', item.bookQuantity);
        },
        error: (err) => {
          console.error('Error decreasing quantity:', err);
        }
      });
    }
  }

  removeItemFromCart(item: CartItem): void {
    this.cartService.removeBookFromCart(item.cartItemId).subscribe({
      next: () => {
        this.getAllCartItems();
        console.log('Item removed from cart:', item.cartItemId);
      },
      error: (err) => {
        console.error('Error removing item from cart:', err);
      }
    });
  }
}
