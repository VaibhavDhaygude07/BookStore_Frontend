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
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  error: string = '';

  customer = {
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    type: 'Home'
  };

  showCustomerDetails: boolean = false;
  showOrderSummary: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('CartComponent initialized');
    this.getAllCartItems();
  }

  getAllCartItems(): void {
    console.log('Fetching cart items...');
    this.cartService.getAllItemsInCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.data.cartItems;
        console.log('Cart items fetched successfully:', this.cartItems);
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
        this.error = 'Failed to load cart items.';
      }
    });
  }

  increaseQuantity(item: CartItem): void {
    const reqData = { bookId: item.bookId };
    console.log(`Increasing quantity for Book ID: ${item.bookId}`);

    this.cartService.addBookToCart(reqData).subscribe({
      next: () => {
        item.bookQuantity++;
        this.getAllCartItems();
        console.log('Quantity increased to:', item.bookQuantity);
      },
      error: (err) => {
        console.error('Error increasing quantity:', err);
      }
    });
  }

  decreaseQuantity(item: CartItem): void {
    console.log(`Decreasing quantity for CartItem ID: ${item.cartItemId}`);
    if (item.bookQuantity === 1) {
      console.log('Quantity is 1, removing item...');
      this.removeItemFromCart(item);
    } else {
      this.cartService.removeBookFromCart(item.cartItemId).subscribe({
        next: () => {
          item.bookQuantity--;
          this.getAllCartItems();
          console.log('Quantity decreased to:', item.bookQuantity);
        },
        error: (err) => {
          console.error('Error decreasing quantity:', err);
        }
      });
    }
  }

  removeItemFromCart(item: CartItem): void {
    console.log(`Removing item from cart: CartItem ID: ${item.cartItemId}`);
    this.cartService.removeBookFromCart(item.cartItemId).subscribe({
      next: () => {
        this.getAllCartItems();
        console.log('Item removed successfully');
      },
      error: (err) => {
        console.error('Error removing item from cart:', err);
      }
    });
  }

   placeOrder(): void {
    console.log('Proceeding to enter customer details...');
    this.showCustomerDetails = true;
  }

  continueToOrderSummary(): void {
    console.log('Customer Details entered:', this.customer);
    this.cartService.addCustomer(this.customer).subscribe({
      next: (res) => {
        console.log('Customer saved successfully:', res);
        this.showOrderSummary = true;
      },
      error: (err) => {
        console.error('Error saving customer:', err);
      }
    });
  }

  onCheckout(): void {
    const finalOrder = {
      customerDetails: this.customer,
      items: this.cartItems
    };
    console.log('Final Order Object before API call:', finalOrder);
    // TODO: Call order API
  }

  loadCustomer(): void {
    console.log('Loading existing customer details...');
    this.cartService.getCustomer().subscribe({
      next: (data) => {
        this.customer = data;
        console.log('Customer data loaded:', this.customer);
      },
      error: (err) => {
        console.error('Error loading customer:', err);
      }
    });
  }
}
