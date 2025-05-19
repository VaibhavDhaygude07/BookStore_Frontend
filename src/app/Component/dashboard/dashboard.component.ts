import { Component } from '@angular/core';
import { BookService } from '../../Services/Book/book.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/Cart/cart.service';
import { RefreshService } from '../../Services/Refresh/refresh.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  searchTerm: string = '';
  username: string = 'User';
  dropdownOpen: boolean = false;

  cartCount: number = 0;


  constructor(private router: Router, private bookService: BookService, private cartService: CartService, private refreshService: RefreshService) { }

  ngOnInit(): void {

    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.username = storedName;
    }
    this.getCartCount();
     this.refreshService.cartRefreshEvent.subscribe(() => {
      this.getCartCount();
    });
     
  }

  getCartCount(): void {
    this.cartService.getAllItemsInCart().subscribe({
      next: (res: any) => {
        this.cartCount = res.data.cartItems.length;
      },
      error: (err) => {
        console.error('Failed to fetch cart count:', err);
      }
    });
  }



  onSearchChange(event: any) {
    this.bookService.setSearchText(event.target.value);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
    this.dropdownOpen = false;
  }

}
